import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../store'
import { ajax } from '../assets/js/ajaxUrl'
import { drawChart, drawMap } from '../assets/js/allCharts'
interface Prop {
    name:string,
    age:number
} 
interface YQ {
    title:string,
    data:Array<number>,
}
export const NewCom: React.FC<Prop> = (props) => {
    const {name, age} = props;
    const [newsData, setNewsData] = useState<Array<object>>([])
    const [seleData, setSeleData] = useState("")
    const cityList = ['城市', '新增', '现有', '累计', '治愈', '死亡'];
    const [waiCity, setWaiCity] = useState<Array<string>>([]);
    const [waiData,setWaiData] = useState<Array<YQ>>([]);
    // useEffect相当于componentDidmount componentDidupdate
    useEffect(()=>{
        if(seleData){
            console.log(seleData)
        }else{
            return;
        }
    },[seleData])
    useEffect(()=>{
        searchNewsData()
        // eslint-disable-next-line
    },[])
    const {state,dispatch} = useContext(AppContext)
    const changeName = (name:string) => {
        dispatch({
            type: "setname",
            name: name
        })
    }
    const changeAge = (age:number) => {
        dispatch({
            type: "setage",
            age: age
        })
    }
    // 调用接口
    const searchNewsData = () => {
        ajax({url:"http://localhost:8080/api/newsdata"}).then(res=>{
            let allData = JSON.parse(res).data.areaTree[2].children
            const allChart = document.getElementsByClassName("chart")
            const allYQData:Array<YQ> = [], allCity:Array<string> = [];
            cityList.map((item:string,index:number)=>{
                if(index === 0){
                    return null;
                }else {
                   return allYQData.push({title:item, data:[]}) 
                }
            })
            allData.map((item:any) => {
                allYQData[0].data.push(item.today.confirm)
                allYQData[1].data.push(item.total.confirm-item.total.heal-item.total.dead)
                allYQData[2].data.push(item.total.confirm)
                allYQData[3].data.push(item.total.heal)
                allYQData[4].data.push(item.total.dead)
                allCity.push(item.name)
                return null;
            })
            setWaiCity(allCity);
            setWaiData(allYQData);
            allData.sort((a:any,b:any)=>{
                let aNum = a.total.confirm-a.total.heal-a.total.dead
                let bNum = b.total.confirm-b.total.heal-b.total.dead
                return bNum - aNum
            })
            allYQData.map((item:YQ, index:number)=>{
                return drawChart({
                    title: item.title,
                    xData: allCity,
                    yData: item.data,
                    dom: allChart[index] as HTMLDivElement
                });
            })
            setNewsData(allData)
        }).catch(rej=>{
            console.log(rej)
        })
    }
    const drawMapBtn = () => {
        drawMap({
            title: waiData[Number(seleData) ?? 0].title,
            xData: waiCity,
            yData: waiData[Number(seleData) ?? 0].data,
            dom: document.getElementById("chartMap") as HTMLDivElement
        })
    }
    return (
        <>
            <p>姓名{state.name} 年龄{state.age}</p>
            <div>
                <button style={{ marginRight: "10px" }}
                onClick={()=>{
                    changeName(name);
                    changeAge(age);
                }}>点击修改信息</button>
            </div>
            <select onChange={(event)=>{
                setSeleData(event.target.value)
            }}>
                {
                    cityList.map((item:string,index:number)=>{
                        if(index === 0){
                            return null;
                        }else {
                           return (
                                <option value={index - 1} key={index}>{item}</option>
                           )
                        }
                    })
                }
            </select>
            <button onClick={drawMapBtn}>点击绘制地图</button>
            <div id="chartMap">
                {/* 疫情地图显示 */}
            </div>
            <div>
                {/* 疫情左侧图表 右侧表格 */}
                <div className="centerUl">
                    <ul className="out_ul">
                    <li>
                        {
                            cityList.map((item:string,index:number)=>{
                                return (
                                    <div key={index} className="all_city">
                                        {item}
                                    </div>
                                )
                            })
                        }
                    </li>
                    {
                        newsData.map((item:any,index:number)=>{
                            return (
                                <li key={index}>
                                    <div className="all_city">{item.name}</div>
                                    <div className="all_city">{item.today.confirm}</div>
                                    <div className="all_city">{item.total.confirm-item.total.heal-item.total.dead}</div>
                                    <div className="all_city">{item.total.confirm}</div>
                                    <div className="all_city">{item.total.heal}</div>
                                    <div className="all_city">{item.total.dead}</div>
                                </li>
                            )
                        })
                    }
                </ul>
                </div>    
                <div className="rightDiv">
                <div className="chart" ></div>
                <div className="chart" ></div>
                <div className="chart" ></div>
                <div className="chart" ></div>
                <div className="chart" ></div>
            </div>
            </div>  
        </>
    )
}
