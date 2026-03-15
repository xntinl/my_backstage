import { makeStyles, useTheme } from '@material-ui/core';

const useStyles = makeStyles({
  svg: {
    width: 'auto',
    height: 28,
    overflow: 'visible',
  },
});

const LogoIcon = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <svg
      className={classes.svg}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 28"
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
    </svg>
  );
};

export default LogoIcon;
