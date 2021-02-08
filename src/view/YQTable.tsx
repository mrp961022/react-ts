import React, { useState, useEffect, useRef } from 'react'
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider, Table, Button, Select, Input, Row, Col } from 'antd'
import https from '../assets/js/https'
import { YQCharts } from '../component/YQCharts'
const { Option } = Select;
interface yqDataType {
    title: string,
    xData: Array<string>,
    yData: Array<number>
}
export const YQTable = () => {
    const [dataSource, setDataSource] = useState<Array<object>>([])
    const [page, setPage] = useState({
        total: 0,
        pageSize: 10,
        currentPage: 1
    })
    const [load, setLoad] = useState<boolean>(false)
    const [inputName, setInputName] = useState<string>("")
    const inputAge = useRef<any>();
    const [tbData, setTbData] = useState<Array<any>>([]);
    const local = zhCN;
    const allYQType = ['新增', '现有', '累计', '治愈', '死亡'];
    const [allYQChart, setAllYQChart] = useState<yqDataType>({
        title: "新增",
        xData: [],
        yData: []
    })
    useEffect(() => {
        // useEffect的第二个参数的三种情况 
        // 1.如果不写相当于componentDidMount和所有状态的componentDidUpdate
        // 2.如果是一个空数组相当于componentDidMount
        // 3.如果数组中有指定状态 相当于对数组中状态的watch
        searchNewsData();
        // eslint-disable-next-line
    }, [])
    // 现有多少的算法
    const nowNum = (allNum: any): number =>
        allNum.total.confirm - allNum.total.heal - allNum.total.dead;
    const searchNewsData = () => {
        // const searchNewsData = async () => {
        // const httpData = await https.yqCharts()
        // console.log(httpData)
        setLoad(true);
        https.yqCharts().then(res => {
            let allData = JSON.parse(res).data.areaTree[2].children;
            let tableData: Array<any> = []
            let yqX: Array<string> = []
            let yqY: Array<number> = []
            // 将数据按照现有排序
            allData.sort((a: any, b: any) => {
                let aNum = nowNum(a);
                let bNum = nowNum(b);
                return bNum - aNum
            })
            allData.map((item: any) =>
                tableData.push({
                    cityName: item.name,// 城市
                    key: item.name,
                    todayConfirm: item.today.confirm, // 今日新增
                    nowData: nowNum(item), // 现有
                    allConfirm: item.total.confirm, // 历史共有
                    heal: item.total.heal, // 治愈
                    dead: item.total.dead, // 死亡
                })
            )
            setPage({
                ...page,
                total: tableData.length,
            })

            tableData.map(item => {
                yqX.push(item.cityName);
                yqY.push(item.todayConfirm);
                return null;
            })
            setAllYQChart({
                ...allYQChart,
                xData: yqX,
                yData: yqY
            })
            setTbData(tableData);
            setDataSource(tableData.slice(0, page.pageSize));
            setLoad(false);
        }).catch(rej => {
            console.log(rej)
        })
    }
    const columns = [
        {
            title: '城市',
            dataIndex: 'cityName',
            key: 'cityName',
            width: 100
        },
        {
            title: '新增',
            dataIndex: 'todayConfirm',
            key: 'todayConfirm',
            width: 100,
            render: (text: string, record: any) => (
                <div>{text ?? "未公布"}</div>
            ),
        },
        {
            title: '现有',
            dataIndex: 'nowData',
            key: 'nowData',
            width: 100
        },
        {
            title: '总共',
            dataIndex: 'allConfirm',
            key: 'allConfirm',
            width: 100
        },
        {
            title: '治愈',
            dataIndex: 'heal',
            key: 'heal',
            width: 100
        },
        {
            title: '死亡',
            dataIndex: 'dead',
            key: 'dead',
            width: 100
        },
    ];
    const paginationProps = {
        showSizeChanger: true,//设置每页显示数据条数
        showQuickJumper: false,
        showTotal: () => `共${page.total}条`,
        pageSize: page.pageSize,
        pageSizeOptions: ["10", "15", "20", "30"],
        total: page.total,  //数据的总的条数
        onChange: (current: any, pageSize: any) => {
            let pageNum = (current - 1) * pageSize
            // console.log(pageNum, pageNum+page.pageSize)
            setPage(() => {
                return {
                    ...page,
                    currentPage: current,
                    pageSize,
                }
            })
            setDataSource(tbData.slice(pageNum, pageNum + pageSize));
        }, //点击当前页码
    }
    const seleData = (value: any) => {
        const yqX: Array<string> = [];
        const yqY: Array<number> = [];
        tbData.map(item => {
            switch (value) {
                case '新增':
                    yqY.push(item.todayConfirm);
                    break;
                case '现有':
                    yqY.push(item.nowData);
                    break;
                case '累计':
                    yqY.push(item.allConfirm);
                    break;
                case '治愈':
                    yqY.push(item.heal);
                    break;
                default:
                    yqY.push(item.dead);
            }
            yqX.push(item.cityName);
            return null;
        })
        setAllYQChart({
            ...allYQChart,
            title: value,
            xData: yqX,
            yData: yqY
        })
    }
    return (
        <ConfigProvider locale={local}>
            <Row className="yqType">
                <Col span={21} className="yqTypeCol">
                    <div className="innerDiv">
                        <span className="seleSpan">姓名</span>
                        <Input value={inputName} className="seleInput" onChange={(e: any) => {
                            setInputName(e.target.value);
                        }} />
                    </div>
                    <div className="innerDiv">
                        <span className="seleSpan">年龄</span>
                        <Input ref={inputAge} className="seleInput" />
                    </div>
                    <div className="innerDiv">
                        <span className="seleSpan">性别</span>
                        <Input className="seleInput" />
                    </div>
                    <div className="innerDiv">
                        <span className="seleSpan">身高</span>
                        <Input className="seleInput" />
                    </div>
                    <div className="innerDiv">
                        <span className="seleSpan">体重</span>
                        <Input className="seleInput" />
                    </div>
                    <div className="innerDiv">
                        <span className="seleSpan">体重</span>
                        <Input className="seleInput" />
                    </div>
                    <div className="innerDiv">
                        <span className="seleSpan">体重</span>
                        <Input className="seleInput" />
                    </div>
                    <div className="innerDiv">
                        <span className="seleSpan">体重</span>
                        <Input className="seleInput" />
                    </div>
                </Col>
                <Col span={3}>
                    <Button type="primary" style={{ marginRight: 10 }} onClick={() => {
                        console.log(inputName);
                        console.log(inputAge.current.state.value);
                    }}>查询</Button>
                    <Button onClick={() => {
                        // setState双向绑定后 直接改变状态
                        // ref直接赋值即可
                        setInputName("");
                        inputAge.current.state.value = "";
                    }}>重置</Button>
                </Col>
            </Row>
            <Table
                dataSource={dataSource}
                columns={columns}
                loading={load}
                size="small"
                scroll={{ y: 160 }}
                pagination={paginationProps}
            />
            <Row className="yqType">
                <Col>
                    <span className="typeName">选择</span>
                    {/* allYQType */}
                    <Select defaultValue="新增" className="typeContent" onSelect={seleData} >
                        {allYQType.map((item: string) => {
                            return (
                                <Option key={item} value={item}>{item}</Option>
                            )
                        })}
                    </Select>
                </Col>
                {/* <Col className="rightSome">
                    <Button type="primary">确认</Button>
                </Col> */}
            </Row>
            <YQCharts {...allYQChart} />
        </ConfigProvider>
    )
}
