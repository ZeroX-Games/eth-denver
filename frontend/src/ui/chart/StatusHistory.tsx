import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react';
import { AreaChart } from '@saas-ui/charts';
import { useRef } from 'react';

const StatusHistory = ({
  selectedFields,
  setCurrentEvent,
  data,
  attributes,
  totalLength,
}: any) => {
  const shownDataMap = data.map((row: any, index: any) => {
    const tempObjs = attributes.map((attribute: string, i: number) => {
      return {
        [attribute]: row[i],
      };
    });
    const convertedObject = tempObjs.reduce((acc: any, obj: any) => {
      const key = Object.keys(obj)[0]; // Get the key of the current object
      acc[key] = obj[key]; // Assign the value of this key to the accumulated object
      return acc;
    }, {});
    let currentIndex;
    if (totalLength <= 10) {
      currentIndex = index;
    } else {
      currentIndex = totalLength - 10 + index;
    }
    return {
      eventId: `Event ${currentIndex + 1}`,
      ...convertedObject,
    };
  });

  const ref = useRef<any>(null);
  const colors: any = {
    Games: '#314ea4',
    WinRate: 'yellow',
    Proficiency: 'purple',
    LeaguePoints: 'cyan',
    TrainingHours: 'blue',
    CriticalHitRate: 'pink',
    Likes: 'yellow',
    HP: '#FF4500',
    Attack: 'green',
    Defense: 'blue',
    Level: '#4db6ac',
    Badages: '#FF4500',
    Championships: '#23abd5',
    Pokedex: '#15bb0c',
    Charm: '#FF69B4',
  };
  const selectedColors = selectedFields.map((field: string) => {
    return colors[field.replace(/\s+/g, '')];
  });

  return (
    <Card
      width="900px"
      backgroundColor="#121212"
      border="1px solid rgba(255, 255, 255, 0.12)"
      color="white"
      key={Math.floor(Math.random() * 10000)} // to force re-render
    >
      <CardHeader pb="0">
        <Heading as="h4" fontWeight="500" size="md">
          Statuses over time
        </Heading>
      </CardHeader>
      <CardBody
        onClick={(e) => {
          e.preventDefault();
          if (!ref.current) return;
          // use ref.current to find a specific element with class name chakra-text
          // console.log(ref.current?.querySelector('.chakra-text').textContent);
          const currentEventStr =
            ref.current?.querySelector('.chakra-text').textContent;
          const currentEventId = parseInt(currentEventStr.split(' ')[1], 10);
          if (totalLength > 10) {
            console.log(currentEventId - (totalLength - 10) - 1);
            setCurrentEvent(currentEventId - (totalLength - 10) - 1);
          } else {
            setCurrentEvent(currentEventId - 1);
          }
        }}
        zIndex={100}
      >
        <AreaChart
          data={shownDataMap}
          categories={selectedFields}
          colors={selectedColors}
          yAxisWidth={80}
          height="250px"
          showGrid={false}
          index="eventId"
          ref={ref}
          showAnimation
        />
      </CardBody>
    </Card>
  );
};

export default StatusHistory;
