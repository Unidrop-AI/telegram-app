import { AreaChart } from '@mantine/charts';
import { Group, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

function splitmix32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x9e3779b9) | 0;
    let t = a ^ (a >>> 16);
    t = Math.imul(t, 0x21f0aaad);
    t = t ^ (t >>> 15);
    t = Math.imul(t, 0x735a2d97);
    return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296;
  };
}

const from = new Date(2024, 7, 17);
const range = [500, 1000];

export const OnlineChart = () => {
  const [data, setData] = useState<Array<{ date: string; Users: number }>>([]);

  useEffect(() => {
    const now = new Date();
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    const newData: typeof data = [];
    for (let i = 24; i > 0; i -= 1) {
      const date = new Date(now);
      date.setHours(now.getHours() - i);
      const r = splitmix32(date.getTime());
      const elapsedHours = Math.floor(
        (date.getTime() - from.getTime()) / 3600000
      );
      const users =
        Math.floor((range[1] - range[0]) * r()) + range[0] + elapsedHours;
      newData.push({ date: `${date.getHours()}:00`, Users: users });
    }
    setData(newData);
  }, []);

  return (
    <section className="mt-5 mb-5 pt-4 pb-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h4 className="h3 text-center text-lg-start">
              <b className="text-gradient me-2">Online</b>
              Users
            </h4>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Group justify="center" mb="xl" gap={40}>
          <Stack justify="center" align="center">
            <Text
              fw={700}
              style={{ color: '#7DDDFB', fontSize: 36, marginBottom: -20 }}
            >
              {Math.max(...data.map((d) => d.Users))}
            </Text>
            <Text>Pick online</Text>
          </Stack>
          <Stack justify="center" align="center">
            <Text
              fw={700}
              style={{ color: '#E4875F', fontSize: 36, marginBottom: -20 }}
            >
              {data[data.length - 1]?.Users}
            </Text>
            <Text>Online now</Text>
          </Stack>
        </Group>
        <AreaChart
          h={300}
          data={data}
          dataKey="date"
          series={[{ name: 'Users', color: 'blue.6' }]}
        />
      </div>
    </section>
  );
};
