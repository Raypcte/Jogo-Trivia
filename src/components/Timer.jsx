import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { questionAnswered, questionTimer } from '../redux/actions';

function Timer() {
  const SECONDS = 1000;
  const MAX_ANSWER_TIME = 30;
  const [seconds, setTime] = useState(MAX_ANSWER_TIME);
  const dispatch = useDispatch();
  const answered = useSelector((state) => state.trivia.answered);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0 && !answered) {
        setTime(seconds - 1);
      } else {
        console.log('Else fela da...');
        clearInterval(interval);
      }
    }, SECONDS);
    dispatch(questionTimer(seconds));
    if (seconds === 0) {
      dispatch(questionAnswered(true));
    }
    return () => clearInterval(interval);
  }, [seconds, answered, dispatch]);
  return (
    <div>
      <span>
        {`Tempo restante: ${seconds}`}
      </span>
    </div>
  );
}

export default Timer;
