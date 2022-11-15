import React, { useState } from "../../vendor/react.js";
import { Button } from "../../vendor/tdesign.min.js";
import { ThemeContext } from "../utils/theme.js";

export function MyButton(props) {
  // 声明一个新的叫做 “count” 的 state 变量
  // Hooks教程 https://zh-hans.reactjs.org/docs/hooks-overview.html
  const [count, setCount] = useState({total: props.initCount || 0, others: 'others'});

  // 类似inject
  // context文档 https://zh-hans.reactjs.org/docs/context.html
  const theme = React.useContext(ThemeContext);
  const id = React.useId();

  // 相当于 componentDidMount 和 componentDidUpdate: (Effect函数可以return一个清除Effect的函数，类似componentWillUnmount)
  // 告诉 React 在完成对 DOM 的更改后运行你的“Effect”函数
  React.useEffect(() => {
    console.log('mounted + updated!');
    return () => {
      console.log('类似beforeUpdated?', count);
    }
  });

  // 传入第二个参数，仅在 count 更改时执行"Effect"函数，类似Vue的watch + 立即执行版本
  React.useEffect(() => {
    console.log(`watch: changes`, count);
  }, [count]);
  
  // https://zh-hans.reactjs.org/docs/hooks-reference.html
  // 返回该回调函数的 memoized 版本，把callback传给子组件用？
  const memoizedCallback = React.useCallback(
    () => {
      console.log(`callback: changes`, count);
    },
    [count],
  );

  // 第二个参数传入空数组，实现mounted和beforeUnmount
  React.useEffect(() => {
    console.log('mounted, theme=', theme, id);
    return () => {
      console.log('componentWillUnmount!');
    }
  }, []);

  return React.createElement(
    Button,
    { className: 'happy',
      onClick: () => setCount({...count, total: count.total + 1}) },
    'Likes count: ' + count.total
  );
}
