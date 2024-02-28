import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react';
import { AreaChart } from '@saas-ui/charts';
import { useRef } from 'react';

// const valueFormatter = (value: any) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//   }).format(value);
// };

const StatusHistory = ({ selectedFields, setCurrentEvent, data }: any) => {
  const ref = useRef<any>(null);
  const colors: any = {
    HP: 'green',
    MP: 'blue',
    Games: 'red',
    Wins: 'yellow',
    Proficiency: 'purple',
    Attack: 'orange',
  };
  const selectedColors = selectedFields.map((field: string) => colors[field]);

  return (
    <Card
      width="900px"
      backgroundColor="tokenBg.200"
      border="1px #333A41 solid"
      color="white"
      key={Math.floor(Math.random() * 10000)} // to force re-render
    >
      <CardHeader pb="0">
        <Heading as="h4" fontWeight="500" size="md">
          States over time
        </Heading>
      </CardHeader>
      <CardBody
        onClick={(e) => {
          e.preventDefault();
          if (!ref.current) return;
          // use ref.current to find a specific element with class name chakra-text
          // console.log(ref.current?.querySelector('.chakra-text').textContent);
          setCurrentEvent(
            ref.current?.querySelector('.chakra-text').textContent,
          );
        }}
      >
        <AreaChart
          data={data}
          categories={selectedFields}
          colors={selectedColors}
          yAxisWidth={80}
          height="300px"
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
