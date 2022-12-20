import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

const App = () => {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments',
    ).then(res => res.json());

    // 데이터 가공 (일기 데이터 초기값 설정)
    const initData = res.slice(0, 20).map(it => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1, //랜덤 숫자로 일단 쓸 것
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };
  // mount되는 시점에 호출
  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1; //id 1씩 증가
    setData(data => [newItem, ...data]);
  }, []);

  const onRemove = useCallback(targetId => {
    setData(data => data.filter(it => it.id !== targetId));
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    setData(data =>
      data.map(it =>
        it.id === targetId ? { ...it, content: newContent } : it,
      ),
    );
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter(it => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 : {goodCount}</div>
      <div>기분 안 좋은 일기 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
};

export default App;
