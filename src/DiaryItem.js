import React, { useContext, useRef, useState } from 'react';
import { DiaryDispatchContext } from './App';

const DiaryItem = ({ author, content, emotion, created_date, id }) => {
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);

  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const [localContent, setLocalContent] = useState(content);

  const localContentInput = useRef();

  const handleRemove = () => {
    if (window.confirm(`${id}번 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  // '수정 취소' 버튼 클릭 시 수정 내용 초기화
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  // '수정 완료' 버튼 클릭 시 내용 반영
  const handleEdit = () => {
    if (localContent.length < 2) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={e => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>

      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};
export default React.memo(DiaryItem);
