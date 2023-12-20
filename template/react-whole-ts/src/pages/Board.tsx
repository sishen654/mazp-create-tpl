import reactLogo from "@assets/react.svg";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { rem } from "@util/index";
// 直接引入可以转化
import "./Board.scss";

// 使用 styled 的 px 无法被自动转化
const StyleWrapper = styled.div`
  button {
    width: ${rem(150)};
    height: ${rem(150)};
    margin-left: ${rem(12)};
  }
`;

const Board = memo(() => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <StyleWrapper>
        <button onClick={() => navigate("/article")}>
          点击登录跳转至 Article 页
        </button>
        <button onClick={() => navigate("/a/b/c")}>
          点击登录跳转至 NotFound 页
        </button>
      </StyleWrapper>
    </div>
  );
});

export default Board;
