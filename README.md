# Backstage + OrbStack K8s — Guía completa local

> Objetivo: levantar Backstage como developer portal local, crear un Software Template que
> genere un Go HTTP service con Dockerfile y manifests K8s, y desplegarlo en el cluster
> Kubernetes de OrbStack con kubectl.

Proyecto: `/Users/sentinel/Documents/projects/backstage01/test01`
Versión Backstage: 1.48.0

---

## Arquitectura

- **Frontend** (React): `packages/app/` → puerto 3000
- **Backend** (Node.js): `packages/backend/` → puerto 7007
- **Templates**: `examples/template/go-http-service/`
- **Skeleton**: `examples/template/go-http-service/skeleton/`

---

## Prerequisitos

```bash
node --version      # Node.js 22 LTS  →  nvm install --lts
yarn --version      # Yarn 4.x        →  corepack enable && corepack prepare yarn@4.4.1 --activate
go version          # Go 1.22+        →  brew install go
docker version      # viene con OrbStack
kubectl version     # viene con OrbStack
kubectl config current-context   # debe mostrar "orbstack"
```

---

## Paso 1 — Crear la app de Backstage

```bash
cd /Users/sentinel/Documents/projects/backstage01
npx @backstage/create-app@latest
# Nombre de la app: test01
cd test01
yarn dev   # verificar http://localhost:3000
```

---

## Paso 2 — Instalar dependencias nuevas

```bash
# Acción custom local:fs:write
yarn workspace backend add fs-extra @backstage/plugin-scaffolder-node @backstage/backend-plugin-api
yarn workspace backend add -D @types/fs-extra

# Módulo de la comunidad (alternativa)
yarn workspace backend add @roadiehq/scaffolder-backend-module-utils
```

Dependencias que se agregan a `packages/backend/package.json`:
```json
"fs-extra": "^11.3.4",
"@backstage/plugin-scaffolder-node": "^0.12.5",
"@backstage/backend-plugin-api": "^1.7.0",
"@roadiehq/scaffolder-backend-module-utils": "^4.1.2"
```
```json
"@types/fs-extra": "^11.0.4"   ← devDependencies
```

---

## Paso 3 — Acción custom `local:fs:write`

El scaffolder NO permite escribir fuera de su workspace por seguridad (`NotAllowedError`).

### Crear `packages/backend/src/writeToLocal.ts` (archivo nuevo)

```ts
import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import fs from 'fs-extra';

export const writeToLocalAction = createTemplateAction({
  id: 'local:fs:write',
  schema: {
    input: {
      required: ['targetPath'],
      properties: {
        targetPath: { type: 'string', title: 'Ruta de destino' },
      },
    },
  },
  async handler(ctx) {
    await fs.ensureDir(ctx.input.targetPath);
    await fs.copy(ctx.workspacePath, ctx.input.targetPath);
    ctx.logger.info(`Archivos copiados a ${ctx.input.targetPath}`);
  },
});
```

### Modificaciones en `packages/backend/src/index.ts`

Agregar al inicio del archivo:
```ts
import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node';
import { createBackendModule } from '@backstage/backend-plugin-api';
import { writeToLocalAction } from './writeToLocal';
```

Agregar el módulo antes de `createBackend()`:
```ts
const scaffolderCustomActions = createBackendModule({
  pluginId: 'scaffolder',
  moduleId: 'custom-actions',
  register(env) {
    env.registerInit({
      deps: { scaffolder: scaffolderActionsExtensionPoint },
      async init({ scaffolder }) {
        scaffolder.addActions(writeToLocalAction);
      },
    });
  },
});
```

Agregar antes de `backend.start()`:
```ts
backend.add(import('@roadiehq/scaffolder-backend-module-utils'));
backend.add(scaffolderCustomActions);
```

> **CRÍTICO:** importar `scaffolderActionsExtensionPoint` desde `@backstage/plugin-scaffolder-node`
> (export principal, NO desde `/alpha`). El import desde `/alpha` devuelve `undefined` en runtime
> causando: `Cannot read properties of undefined (reading 'id')` al arrancar el scaffolder.

---

## Paso 4 — Modificaciones en `app-config.yaml`

Agregar bajo `backend:`:
```yaml
backend:
  workingDirectory: /Users/sentinel/Documents/projects/backstage01
```

Agregar en `catalog.locations`:
```yaml
catalog:
  locations:
    - type: file
      target: ../../examples/template/go-http-service/template.yaml
      rules:
        - allow: [Template]
```

> `workingDirectory` va bajo `backend:`, NO bajo `scaffolder:`. Si se pone bajo `scaffolder:`
> el setting no aplica y los archivos van al directorio temporal del sistema.
>
> La ruta `target` es relativa a `packages/backend/`. Dos niveles arriba = raíz del proyecto.

---

## Paso 5 — Crear el template Go HTTP Service

Estructura a crear dentro de `examples/template/go-http-service/`:

```
examples/template/go-http-service/
├── template.yaml
└── skeleton/
    ├── catalog-info.yaml
    ├── main.go
    ├── go.mod
    ├── Dockerfile
    └── k8s/
        ├── namespace.yaml
        ├── deployment.yaml
        └── service.yaml
```

### `template.yaml`

```yaml
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: go-http-service
  title: Go HTTP Service
  description: Crea un servicio HTTP en Go con Dockerfile y manifests K8s listos para OrbStack
  tags: [go, kubernetes]
spec:
  owner: platform-team
  type: service

  parameters:
    - title: Información del servicio
      required: [name, port]
      properties:
        name:
          title: Nombre del servicio
          type: string
          pattern: '^[a-z][a-z0-9-]*$'
          ui:help: Solo minúsculas, números y guiones. Ej. hello-service
        port:
          title: Puerto HTTP
          type: integer
          default: 8080
  steps:
    - id: fetch
      name: Generar archivos del skeleton
      action: fetch:template
      input:
        url: ./skeleton
        targetPath: ./${{ parameters.name }}
        values:
          name: ${{ parameters.name }}
          port: ${{ parameters.port }}
    - id: persist
      name: Guardar en disco
      action: local:fs:write
      input:
        targetPath: /Users/sentinel/Documents/projects/backstage01/${{ parameters.name }}
  output:
    links:
      - title: Ver archivos generados
        url: file:///Users/sentinel/Documents/projects/backstage01
```

> **Errores a evitar:**
> - `pattern` sin cerrar → YAML inválido → template no aparece en UI:
>   `'^[a-z][a-z0-9-]*` ❌ → `'^[a-z][a-z0-9-]*$'` ✅
> - `output` debe ser hermano de `steps:` (mismo nivel bajo `spec:`), no hijo de un step.

### `skeleton/main.go`

```go
package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "${{ values.port }}"
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{
			"status":  "ok",
			"service": "${{ values.name }}",
		})
	})

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{
			"message": "Hello from ${{ values.name }}",
		})
	})

	log.Printf("Starting ${{ values.name }} on :%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
```

### `skeleton/go.mod`

```
module github.com/local/${{ values.name }}

go 1.22
```

### `skeleton/Dockerfile`

```dockerfile
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod .
COPY main.go .
RUN go build -o server .

FROM alpine:3.19
WORKDIR /app
COPY --from=builder /app/server .
EXPOSE ${{ values.port }}
CMD ["./server"]
```

### `skeleton/catalog-info.yaml`

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: ${{ values.name }}
  description: Go HTTP service desplegado en K8s local (OrbStack)
  tags: [go, kubernetes]
spec:
  type: service
  lifecycle: experimental
  owner: platform-team
```

### `skeleton/k8s/namespace.yaml`

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: ${{ values.name }}
```

### `skeleton/k8s/deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${{ values.name }}
  namespace: ${{ values.name }}
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ${{ values.name }}
  template:
    metadata:
      labels:
        app: ${{ values.name }}
    spec:
      containers:
        - name: ${{ values.name }}
          image: ${{ values.name }}:latest
          imagePullPolicy: Never
          ports:
            - containerPort: ${{ values.port }}
          env:
            - name: PORT
              value: "${{ values.port }}"
```

> `imagePullPolicy: Never` — K8s usa la imagen del daemon Docker local de OrbStack
> sin hacer pull desde un registry remoto.

### `skeleton/k8s/service.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: ${{ values.name }}
  namespace: ${{ values.name }}
spec:
  selector:
    app: ${{ values.name }}
  ports:
    - port: 80
      targetPort: ${{ values.port }}
```

---

## Flujo completo de uso

### 1. Arrancar

```bash
cd /Users/sentinel/Documents/projects/backstage01/test01
yarn dev
```

### 2. Crear un servicio

1. http://localhost:3000/create → **Go HTTP Service** → **Choose**
2. Nombre: `hello-service`, Puerto: `8080` → **Create**
3. Archivos generados en `/Users/sentinel/Documents/projects/backstage01/hello-service/`

### 3. Build Docker

```bash
cd /Users/sentinel/Documents/projects/backstage01/hello-service
docker build -t hello-service:latest .
```

### 4. Deploy en OrbStack K8s

```bash
kubectl config current-context   # → orbstack
kubectl apply -f k8s/
kubectl get pods -n hello-service --watch
```

### 5. Acceder

```bash
kubectl port-forward svc/hello-service 8080:80 -n hello-service
curl http://localhost:8080/health
# {"service":"hello-service","status":"ok"}
```

---

## Troubleshooting

| Síntoma | Causa | Fix |
|---------|-------|-----|
| Templates no aparecen (0 en All) | Scaffolder plugin falla al arrancar | Ver logs del backend |
| `Cannot read properties of undefined (reading 'id')` | Import desde `/alpha` | Cambiar import a export principal |
| `workingDirectory` no aplica | Config bajo `scaffolder:` | Mover a sección `backend:` |
| `NotAllowedError: Relative path...` | `roadiehq:utils:fs:write` con ruta absoluta | Usar acción custom `local:fs:write` |
| YAML inválido en template | `pattern` sin cerrar | Agregar `$'` al final del pattern |
| `ImagePullBackOff` en K8s | Imagen no existe localmente | Verificar `imagePullPolicy: Never` |

---

## Próximos pasos

1. **Agregar plugin K8s en Backstage** — ver pods/logs directamente en el catálogo
2. **Agregar más campos al template** — descripción, owner, número de réplicas
3. **Crear segundo template** — ej. Go gRPC service o Rust HTTP service
4. **Configurar TechDocs** — agregar `mkdocs.yml` al skeleton para documentación automática
5. **GitOps con Argo CD** — instalar Argo CD en OrbStack K8s y automatizar el deploy
