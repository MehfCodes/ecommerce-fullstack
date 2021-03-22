import ErrorMessage from '../error-message/error-message';
import { Transition, animated } from 'react-spring/renderprops';
import './animated-error-message.scss';
function AnimatedErrorMessage({
  items,
  keys,
  from,
  enter,
  leave,
  config,
  trail,
  errorHandler,
}) {
  return (
    <div className="animated-div">
      <Transition
        items={items}
        keys={keys}
        from={from}
        enter={enter}
        leave={leave}
        config={config}
        trail={trail}
      >
        {(error, _, i) =>
          error &&
          ((props) => {
            return (
              <animated.div style={props}>
                <ErrorMessage
                  errMsg={error}
                  errorHandler={() => errorHandler(i)}
                />
              </animated.div>
            );
          })
        }
      </Transition>
    </div>
  );
}

export default AnimatedErrorMessage;
