import { Flex, HStack, Image, Tooltip, VStack } from '@chakra-ui/react';
import { arbitrumIcon, nftCard, startButton } from '@/assets';
import DetailAttributes from '@ui/detailNav/DetailAttributes';
import StatusHistory from '@ui/chart/StatusHistory';
import StyledPanel from '@ui/tabPanels/StyledPanel';
import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { generateAttributeChanges } from '@/utilities/getRandomUpdate';
import { useNavigate } from 'react-router-dom';
import { RandomNumbersContext } from '@/utilities/context';

// TODO: convert static data to api call
const GAME_ATTRIBUTES = [
  'Games',
  'Win Rate',
  'HP',
  'Attack',
  'Defense',
  'Likes',
];

const GAME_ATTRIBUTES_TABLE = [
  'Games',
  'WinRate',
  'HP',
  'Attack',
  'Defense',
  'Likes',
];

// const GameResponseData = [
//   [60, 12, 104, 130, 140, 207, 100],
//   [75, 22, 90, 131, 143, 210, 103],
//   [76, 24, 112, 132, 146, 212, 107],
//   [70, 26, 129, 133, 149, 213, 111],
//   [66, 30, 130, 134, 154, 214, 114],
//   [63, 45, 101, 135, 156, 217, 118],
//   [70, 32, 122, 136, 158, 220, 120],
//   [80, 40, 150, 137, 165, 224, 120],
//   [81, 42, 151, 138, 172, 226, 120],
//   [78, 50, 142, 139, 176, 229, 120],
// ];

const fetchUrl =
  'https://5732-207-194-2-34.ngrok-free.app/trpc/fetchNFTValuesRouter.fetchNFTValues';

// TODO: Fetch the collection information from the backend
const DOMAINID = 16;
const CHAINID = 84532;
const COLLECTIONADDR = '0xED5AF388653567Af2F388E6224dC7C4b3241C544';
const TOKENID = 172;

const CardPanel = () => {
  const globalRandomNumber = useContext(RandomNumbersContext);

  const [selectedFields, setSelectedFields] = useState<string[]>([
    'WinRate',
    'Games',
    'HP',
  ]);
  const [currentEvent, setCurrentEvent] = useState<number>(0);
  const [stateByEvent, setStateByEvent] = useState<any>(null);
  const [prevStateByEvent, setPrevStateByEvent] = useState<any>(null);
  const [realData, setRealData] = useState<any>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (realData) {
      const select = realData[currentEvent];
      setStateByEvent(select);
      if (currentEvent < 1) {
        setPrevStateByEvent(select);
      } else {
        setPrevStateByEvent(realData[currentEvent - 1]);
      }
    }
  }, [currentEvent, realData]);

  useEffect(() => {
    if (realData) {
      setCurrentEvent(realData.length - 1);
    }
  }, [realData]);

  const cache = useRef(false);
  const fetchData = async () => {
    if (!cache.current) {
      try {
        cache.current = true;
        const res = await axios.post(fetchUrl, {
          domainId: DOMAINID,
          chainID: CHAINID,
          collectionAddr: COLLECTIONADDR,
          tokenIds: [TOKENID],
          attribute: [
            'total games',
            'wins',
            'league points',
            'proficiency',
            'training hours',
            'critical hit rate',
            'likes',
          ],
          numberOfHisotry: 10,
        });

        const currentState = res.data.result.data.tokenValues[TOKENID];
        const updates = res.data.result.data.tokenHistory[0].history;
        const parsedData = [];
        const lastStatus = [
          currentState[1],
          currentState[2],
          currentState[3],
          currentState[4],
          currentState[5],
          currentState[6],
          currentState[7],
        ];
        parsedData.push(lastStatus);
        let current = lastStatus;
        // eslint-disable-next-line no-plusplus
        for (let i = updates.length - 1; i >= 0; i--) {
          const currentUpdate = updates[i];
          const last = current.map((value, index) => {
            return value - currentUpdate[index];
          });
          current = last;
          parsedData.push(last);
        }
        parsedData.pop();
        parsedData.reverse();
        setRealData(parsedData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const postUpdate = (updateMatrix: any) => {
    const res = axios.post(
      'https://5732-207-194-2-34.ngrok-free.app/trpc/flow.flow',
      {
        chainID: CHAINID,
        deltas: [
          {
            domainId: `${DOMAINID}`,
            deltas: [
              {
                collectionAddr: COLLECTIONADDR,
                matrix: [[172, ...updateMatrix]],
              },
            ],
          },
        ],
      },
    );
    console.log(res);
  };
  return (
    <StyledPanel>
      <VStack justifyContent="center" p={10} pt={6} gap={14}>
        <HStack
          width="100%"
          gap={16}
          alignItems="start"
          justifyContent="center"
        >
          <Flex
            width="300px"
            height="300px"
            justifyContent="center"
            alignItems="center"
            backgroundColor="#121212"
            borderRadius="lg"
            border="1px solid rgba(255, 255, 255, 0.12)"
            mt="68px"
            position="relative"
          >
            <Image src={nftCard} width="200px" height="270px" />

            <Tooltip hasArrow label="Arbitrum Explorer">
              <a
                rel="noopener noreferrer"
                href="https://basescan.org/"
                target="_blank"
                style={{
                  position: 'absolute',
                  bottom: 15,
                  right: 15,
                  width: 30,
                  zIndex: 1000,
                }}
                aria-label="Explorer"
              >
                <Image zIndex={1000} cursor="pointer" src={arbitrumIcon} />
              </a>
            </Tooltip>
          </Flex>
          {stateByEvent && realData && (
            <DetailAttributes
              selectedFields={selectedFields}
              setSelectedFields={setSelectedFields}
              currentEvent={currentEvent}
              currentState={stateByEvent}
              prevState={prevStateByEvent}
              attributes={GAME_ATTRIBUTES}
              eventSize={realData.length}
            />
          )}
        </HStack>
        {/* {selectedFields.length > 0 && ( */}

        <HStack width="100%" justifyContent="center">
          {/* <Link to="game-session"> */}
          <Image
            src={startButton}
            className="neon-effect"
            height="60px"
            cursor="pointer"
            onClick={() => {
              const randomUpdates = generateAttributeChanges();
              const attributeChange = GAME_ATTRIBUTES.reduce(
                (obj: any, key, index) => {
                  // eslint-disable-next-line no-param-reassign
                  obj[key] = randomUpdates[index];
                  return obj;
                },
                {},
              );
              const currentAttributes = GAME_ATTRIBUTES.reduce(
                (obj: any, key, index) => {
                  // eslint-disable-next-line no-param-reassign
                  obj[key] = realData[-1][index];
                  return obj;
                },
                {},
              );
              globalRandomNumber.setAttributeChanges(attributeChange);
              globalRandomNumber.setCurrentAttributes(currentAttributes);
              console.log('randomUpdates', currentAttributes);
              console.log('randomUpdates', attributeChange);
              postUpdate(generateAttributeChanges());
              navigate('/game-session');
            }}
          />
          {/* </Link> */}
        </HStack>
        {realData && (
          <StatusHistory
            selectedFields={selectedFields}
            setCurrentEvent={setCurrentEvent}
            data={realData}
            attributes={GAME_ATTRIBUTES_TABLE}
          />
        )}

        {/* )} */}
      </VStack>
    </StyledPanel>
  );
};

export default CardPanel;
