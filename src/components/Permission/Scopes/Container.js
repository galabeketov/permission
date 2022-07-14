import update from 'immutability-helper';
import { memo, useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { Card } from './Card.js';
import { ItemTypes } from './ItemTypes.js';
import axios from 'axios';
const style = {
  width: '100%',
  height: '50vh',
  overflowY: 'auto',
  overflowX: 'hidden',
};
const ITEMS = [
  {
    id: 1,
    text: 'Write a cool JS library',
  },
  {
    id: 2,
    text: 'Make it generic enough',
  },
  {
    id: 3,
    text: 'Write README',
  },
  {
    id: 4,
    text: 'Create some examples',
  },
  {
    id: 5,
    text: 'Spam in Twitter and IRC to promote it',
  },
  {
    id: 6,
    text: '???',
  },
  {
    id: 7,
    text: 'PROFIT',
  },
];
export const Container = memo(function Container() {
  const [scopes, setScopes] = useState();
  useEffect(() => {
    var data = '';

    var config = {
      method: 'get',
      url: 'https://v3.soliqservis.uz:3443/api/client-platform/7d4a4c38-dd84-4902-b744-0488b80a4c01',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfcGxhdGZvcm1faWQiOiI3ZDRhNGMzOC1kZDg0LTQ5MDItYjc0NC0wNDg4YjgwYTRjMDEiLCJjbGllbnRfdHlwZV9pZCI6IjVhMzgxOGE5LTkwZjAtNDRlOS1hMDUzLTNiZTBiYTFlMmMwMSIsImRhdGEiOiJhZGRpdGlvbmFsIGpzb24gZGF0YSIsImV4cCI6MTY1NzgzODM4OCwiaWF0IjoxNjU3ODA5NTg4LCJpZCI6ImFkYjEwMTg4LTdmM2QtNGFiOC1iNDgzLTMzMzQ5YzNmMTJkMSIsImlwIjoiYWRkaXRpb25hbCBqc29uIGRhdGEiLCJwcm9qZWN0X2lkIjoiZTA0NzY2YmMtMzIyOC00Y2Q5LWJkMjItMDllM2ZhMjdhNmJlIiwicm9sZV9pZCI6ImExY2ExMzAxLTRkYTktNDI0ZC1hOWUyLTU3OGFlNmRjZGUwMSIsInVzZXJfaWQiOiI0YjJmN2RiNi1hYTQ3LTRkNmQtYTQzYi0wZmExMjA4MDg0MWYifQ.YV-MsZw5Kwbnv_F6ALvG7Kx3RW_m30YdfCDU1FFlRFk',
        Accept: 'application/json',
        'platform-id': '7d4a4c38-dd84-4902-b744-0488b80a4c01',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setScopes(response.data.data.scopes);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const [cards, setCards] = useState(ITEMS);
  const findCard = useCallback(
    (id) => {
      const card = cards.filter((c) => `${c.id}` === id)[0];
      return {
        card,
        index: cards.indexOf(card),
      };
    },
    [cards],
  );
  const moveCard = useCallback(
    (id, atIndex) => {
      const { card, index } = findCard(id);
      setCards(
        update(cards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        }),
      );
    },
    [findCard, cards, setCards],
  );
  console.log('scopes', scopes);
  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));
  return (
    <div ref={drop} style={style}>
      {scopes?.map((card) => (
        <Card
          key={card.client_platform_id}
          id={`${card.client_platform_id}`}
          text={
            <div className="d-flex align-items-center gap-3">
              <div className="px-2 py-1 border bg-primary text-white rounded">
                {card.method}
              </div>
              <div>{card.path}</div>
            </div>
          }
          moveCard={moveCard}
          findCard={findCard}
        />
      ))}
    </div>
  );
});
