import React, { useState, useEffect } from 'react';

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`CounterA Update - count : ${count}`);
  });

  return <div>{count}</div>;
});
const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`CounterB Update - count : ${obj.count}`);
  });
  return <div>{obj.count}</div>;
};
const areEqual = (prevProps, nextProps) => {
  if (prevProps.obj.count === nextProps.obj.count) {
    return true; //이전 프롭스와 현재 프롭스가 같다 -> 리렌더X
  }
  return false; // 이전과 현재가 다르다 -> 리렌더 일으킴
  // if 구문 한 줄로 줄일 수 있음 => return prevProps.obj.count === nextProps.obj.count;
};
const MemoizedCounterB = React.memo(CounterB, areEqual);
//리렌더링을 할지 말지 결정하는 컴포넌트
// areEqual은 React.memo의 비교 함수로서 작용

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button
          onClick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B button
        </button>
      </div>
    </div>
  );
};
export default OptimizeTest;
