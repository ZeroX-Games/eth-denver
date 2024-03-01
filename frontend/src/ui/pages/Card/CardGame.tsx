import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Box, Image } from '@chakra-ui/react';
import cardGameHome from '@assets/cardGame.png';
import cardGameEnd from '@assets/cardGameEnd.png';
import backArrow from '@assets/backArrow.png';
import endButton from '@assets/endButton.png';
import summaryButton from '@assets/summaryBtn.png';

const CardGame = () => {
  const [imageIndex, setImageInedx] = useState(0);

  const backgroundImages = [cardGameHome, cardGameEnd];
  const buttonImages = [endButton, summaryButton];

  return (
    <Box position="relative" h="100vh" w="100vw">
      <Link to="../">
        <Image
          src={backArrow}
          position="absolute"
          top="40px"
          left="40px"
          zIndex={1400}
        />
      </Link>
      <Image
        src={backgroundImages[imageIndex]}
        w="100vw"
        h="100vh"
        position="absolute"
        zIndex={1399}
      />
      <Image
        src={buttonImages[imageIndex]}
        position="absolute"
        right="40px"
        zIndex={1401}
        top="50%"
        cursor="pointer"
        onClick={() => setImageInedx((prev) => Number(!Boolean(prev)))}
      />
    </Box>
  );
};

export default CardGame;
