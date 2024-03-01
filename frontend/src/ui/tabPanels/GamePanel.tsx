import { Flex, HStack, Image, Tooltip, VStack } from '@chakra-ui/react';
import { baseLogo, nftDance, startButton } from '@/assets';
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
  'Win Rate',
  'Critical Hit Rate',
  'League Points',
  'Games',
  'Proficiency',
  'Training Hours',
  'Likes',
];

// remove spaces from the attributes
const GAME_ATTRIBUTES_TABLE = GAME_ATTRIBUTES.map((attr) =>
  attr.replace(/ /g, ''),
);

// TODO: Fetch the collection information from the backend
const DOMAINID = Number(import.meta.env.VITE_FIGHTER_DOMAINID);
const CHAINID = Number(import.meta.env.VITE_FIGHTER_CHAINID);
const COLLECTIONADDR = import.meta.env.VITE_COLLECTIONADDR;
const TOKENID1 = Number(import.meta.env.VITE_TOKENID1);
const TOKENID2 = Number(import.meta.env.VITE_TOKENID2);

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PORT = import.meta.env.VITE_API_PORT;

const fetchUrl = `${API_BASE}:${API_PORT}/trpc/fetchNFTValuesRouter.fetchNFTValues`;
const postUrl = `${API_BASE}:${API_PORT}/trpc/flow.flow`;

console.log('fetchUrl', fetchUrl);
console.log('postUrl', postUrl);

const GamePanel = () => {
  const globalRandomNumber = useContext(RandomNumbersContext);
  const [selectedFields, setSelectedFields] = useState<string[]>([
    'WinRate',
    'CriticalHitRate',
    'LeaguePoints',
  ]);
  const [currentEvent, setCurrentEvent] = useState<number>(0);
  const [stateByEvent, setStateByEvent] = useState<any>(null);
  const [prevStateByEvent, setPrevStateByEvent] = useState<any>(null);
  const [realData, setRealData] = useState<any>(null);
  const [totalLength, setTotalLength] = useState<number>(0);
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
          tokenIds: [TOKENID1],
          attribute: GAME_ATTRIBUTES,
          numberOfHisotry: 10,
        });

        const currentState = res.data.result.data.tokenValues[TOKENID1];
        const updates = res.data.result.data.tokenHistory[0].history;
        const parsedData = [];
        const currentStateLength = Object.keys(currentState).length;
        const lastStatus = [];
        for (let i = 0; i < currentStateLength; i++) {
          lastStatus.push(currentState[i + 1]);
        }
        // const lastStatus = currentState.slice(1);
        parsedData.push(lastStatus);
        console.log('parsedData', parsedData);
        let current = lastStatus;
        // eslint-disable-next-line no-plusplus
        for (let i = updates.length - 1; i >= 0; i--) {
          const currentUpdate = updates[i];
          const last = current.map((value: any, index: any) => {
            return value - currentUpdate[index];
          });
          current = last;
          parsedData.push(last);
        }
        parsedData.pop();
        parsedData.reverse();
        setTotalLength(res.data.result.data.tokenHistory[0].historySize);
        setRealData(parsedData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const postUpdate = (updateMatrixToken1: any, updateMatrixToken2: any) => {
    const res = axios.post(postUrl, {
      chainID: CHAINID,
      batch: [
        {
          domainId: DOMAINID,
          deltas: [
            {
              collectionAddr: COLLECTIONADDR,
              matrix: [[TOKENID1, ...updateMatrixToken1]],
            },
          ],
        },
        {
          domainId: DOMAINID,
          deltas: [
            {
              collectionAddr: COLLECTIONADDR,
              matrix: [[TOKENID2, ...updateMatrixToken2]],
            },
          ],
        },
      ],
    });
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
            backgroundColor="#3A26B5"
            // backgroundColor="#3A3A3A"
            borderRadius="lg"
            border="1px solid rgba(255, 255, 255, 0.12)"
            mt="68px"
            position="relative"
          >
            <Image src={nftDance} width="200px" height="200px" />

            <Tooltip hasArrow label="Base Explorer">
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
                <Image zIndex={1000} cursor="pointer" src={baseLogo} />
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
              totalLength={totalLength}
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
              const randomUpdates2 = randomUpdates.map(
                (number: any) => -Math.abs(number),
              );

              const attributeChange = GAME_ATTRIBUTES.reduce(
                (obj: any, key, index) => {
                  // eslint-disable-next-line no-param-reassign
                  obj[key] = randomUpdates[index];
                  return obj;
                },
                {},
              );
              console.log(realData[realData.length - 1]);
              const currentAttributes = GAME_ATTRIBUTES.reduce(
                (obj: any, key, index) => {
                  // eslint-disable-next-line no-param-reassign
                  obj[key] = realData[realData.length - 1][index];
                  return obj;
                },
                {},
              );
              globalRandomNumber.setAttributeChanges(attributeChange);
              globalRandomNumber.setCurrentAttributes(currentAttributes);
              postUpdate(randomUpdates, randomUpdates2);
              navigate('/game-session/fighter');
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
            totalLength={totalLength}
          />
        )}

        {/* )} */}
      </VStack>
    </StyledPanel>
  );
};

export default GamePanel;
