import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Col } from 'antd'
import { AppContext } from '../store'
import { drawChart, drawMap } from '../assets/js/allCharts'
interface Prop {
    title: string,
    xData: Array<string>,
    yData: Array<number>,
}
export const YQCharts = (prop: Prop) => {
    const { state } = useContext(AppContext);
    const history = useHistory();
    useEffect(() => {
        if (prop.xData.length === 0) return;
        setTimeout(() => {
            if (history.location.pathname !== "/yqtable") return;
            drawAllChart();
        }, 300);
        // eslint-disable-next-line
    }, [prop, state.isMini])
    useEffect(() => {
        // 监听浏览器窗口宽高变化，重新绘制图表
        // window.addEventListener('resize',throttle(drawAllChart,1000))
        window.onresize = throttle(drawAllChart, 1000)
        // eslint-disable-next-line
    }, [prop])
    const throttle = (fn: Function, wait: number) => {
        var timer: any = null;
        return () => {
            // console.warn(prop)
            if (!timer) {
                timer = setTimeout(() => {
                    fn();
                    timer = null;
                }, wait)
            }
        }
    }
    const drawAllChart = () => {
        drawChart({
            ...prop,
            dom: document.getElementById("leftChart") as HTMLDivElement
        })
        drawMap({
            ...prop,
            dom: document.getElementById("rightChart") as HTMLDivElement
        })
    }
    return (
        <Row id="yqChart" gutter={16}>
            <Col span={12}>
                <div id="leftChart" className="infoChart"></div>
            </Col>
            <Col span={12}>
                <div id="rightChart" className="infoChart"></div>
            </Col>
        </Row>
    )
}
