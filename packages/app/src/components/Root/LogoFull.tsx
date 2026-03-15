import { makeStyles, useTheme } from '@material-ui/core';

const useStyles = makeStyles({
  svg: {
    width: 'auto',
    height: 30,
    overflow: 'visible',
  },
});

const LogoFull = () => {
  const classes = useStyles();
  const theme = useTheme();
  const textColor = theme.palette.text.primary;

  return (
    <svg
      className={classes.svg}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 190 30"
      aria-label="Dev Portal"
    >
      <text
        x="0"
        y="22"
        fontFamily="'Courier New', Courier, monospace"
        fontSize="20"
        fontWeight="700"
        fill={theme.palette.primary.main}
      >
        {'>'}_
      </text>
      <text
        x="44"
        y="22"
        fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
        fontSize="16"
        fontWeight="600"
        fill={textColor}
      >
        Dev Portal
      </text>
    </svg>
  );
};

export default LogoFull;
