import "./styles.css";
import { useReducer } from "react";
import OperationButton from "./OperationButton";
import DigitButton from "./DigitButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  REMOVE_DIGIT: "remove-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  EVALUATE: "evaluate",
};

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (
        payload.digit === "." &&
        (state.currentInput.includes(".") || state.currentInput === "")
      ) {
        return state;
      }

      if (
        payload.digit === "0" &&
        state.currentInput.includes("0") &&
        state.currentInput.length === 1
      ) {
        return state;
      }

      return {
        ...state,
        currentInput: `${state.currentInput || ""}${payload.digit}`,
      };

    case ACTIONS.REMOVE_DIGIT:
      if (!state.currentInput) {
        return state;
      }
      if (state.currentInput) {
        return { ...state, currentInput: state.currentInput.slice(0, -1) };
      }
      if (!state.currentInput && state.operation) {
        return {
          ...state,
          currentInput: state.previousInput,
          operation: "",
          previousInput: "",
        };
      }
      return state;

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentInput && !state.previousInput) {
        return {
          ...state,
          previousInput: state.currentInput,
          currentInput: "",
          operation: payload.operator,
        };
      }

      if (state.previousInput && state.operation && !state.currentInput) {
        return { ...state, operation: payload.operator };
      }

      return state;

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.EVALUATE:
      if (!state.currentInput || !state.operation || !state.previousInput) {
        return state;
      }

      const firstNum = parseFloat(state.previousInput);
      const secondNum = parseFloat(state.currentInput);

      if (state.operation === "+") {
        const numSum = firstNum + secondNum;
        return {
          ...state,
          currentInput: `${numSum}`,
          operation: "",
          previousInput: "",
        };
      }

      if (state.operation === "-") {
        const numSubtract = firstNum - secondNum;
        return {
          ...state,
          currentInput: `${numSubtract}`,
          operation: "",
          previousInput: "",
        };
      }

      if (state.operation === "x") {
        const numMultiply = firstNum * secondNum;
        return {
          ...state,
          currentInput: `${numMultiply}`,
          operation: "",
          previousInput: "",
        };
      }

      if (state.operation === "/") {
        const numDivide = firstNum / secondNum;
        return {
          ...state,
          currentInput: `${numDivide}`,
          operation: "",
          previousInput: "",
        };
      }
      break;

    default:
      return state;
  }
}

function App() {
  const initialState = {
    currentInput: "",
    previousInput: "",
    operation: null,
  };

  const [{ currentInput, previousInput, operation }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previousInput">
          {previousInput} {operation}
        </div>
        <div className="currentInput">{currentInput}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.REMOVE_DIGIT })}>
        DEL
      </button>
      <OperationButton operator="x" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operator="/" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operator="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operator="-" dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
