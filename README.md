This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## 克隆项目后安装建议用yarn安装依赖

## ts + react + and 创建过程
> 1. npx create-react-app demo --typescript
> 2. 安装antd依赖 `yarn add antd --save`
> 3. 安装router以及router的ts支持 `yarn add react-router-dom @types/react-router-dom --save`
> 4. 安装对antd公共样式的修改支持以及ts支持 `yarn add craco-less @craco/craco --save`
> 5. 根目录新增文件 `craco.config.js` 内容如下
```
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // 这里根据需要修改antd的变量颜色
            modifyVars: { '@primary-color': '#1890ff' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
```
> 6. 或者直接在less文件中修改颜色
```
@import '~antd/dist/antd.less';
@primary-color: green;
```

### hook + ts 创建jsx组件（有传参的组件）
```
import React from 'react';
interface Prop {
    // prop的入参格式 例如
    name: string,
    age: number,
}
export const ReactDom = (prop:Prop) => {
    // 各种操作
    return (
        jsx组件
    )
}
```
### router的Switch标签的直接自标签不能是route意外的其他的jsx
```
// 假设Header标签是antd Layout中的Header 这样写是错误的
<Switch>
    <Header>这是头部</Header>
</Switch>
// 正确写法 可以使用空的元素标签包裹
<Switch>
    <>
    <Header>这是头部</Header>
    </>
</Switch>
```
### useEffect 第二个参数的三种情况 
* 1. 如果不写相当于componentDidMount和所有状态的componentDidUpdate
* 2. 如果是一个空数组相当于componentDidMount
* 3. 如果数组中有指定状态 相当于对数组中状态的watch
* 4. 注意如果需要调用组件中的方法 需要忽略eslint监控 具体代码```eslint-disable-next-line```

### hook + typescript 监听input的两种方式
* 1. 使用`useState` 需要双向绑定数据
```
const [data,setData] = useState("");
<input value={data} onInput={(e:any)=>{
    setData(e.target.value)
}} />
<button onClick={()=>{
    console.log(data);
}}>查看</button>
```
* 2. 使用`useRef` 
```
const inputName = useRef<any>();
<input ref={inputName}/>
<button onClick={()=>{
    console.log(inputName.current.state.value)
}}>查看</button>
```