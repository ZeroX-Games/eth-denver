import { extendTheme } from '@chakra-ui/react';
import scrollbar from '@/theme/ScrollBar';

const customTheme = extendTheme({
  styles: {
    global: (props: any) => ({
      ...scrollbar(props),
      // You can add other global styles here
    }),
  },
  colors: {
    hoverBg: {
      200: '#292F36',
    },
    border: {
      100: '#4a4f56',
      200: '#383e44',
      500: '#21262D',
    },
    tokenBg: {
      200: '#31373D',
      500: '#161B22',
      700: '#0C1218',
    },
    subTextColor: {
      200: '#B0BEC5',
    },
    linkTextColor: {
      200: '#8ABFF5',
    },
  },
});

export default customTheme;
