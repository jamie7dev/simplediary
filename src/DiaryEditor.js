import {useRef, useState} from "react";

const DiaryEditor = () => {
  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if(state.author.length < 1){
      // alert("작성자에 최소 한 글자 이상 입력해주세요"); //alert은 좋은 UX가 아님 => focus를 주는 방향으로 제작
      //focus
      authorInput.current.focus();
      return;  // 더 이상 진행 안 되도록 방지
    }
    if(state.content.length < 5){
      //focus
      contentInput.current.focus();
      return; // 더 이상 진행 안 되도록 방지
    }
    alert("저장 성공");
  }

  return(
    //css 적용 시 컴포넌트 이름과 최상위 div태그 이름이 같으면 좋음
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <span>오늘의 감정 점수 : </span>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};
export default DiaryEditor;
