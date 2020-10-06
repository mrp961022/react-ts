import echarts from 'echarts'
import chinaJson from '../json/china.json'
interface ChartData {
    title: string,
    xData: Array<string>,
    yData: Array<number>,
    dom: HTMLDivElement | HTMLCanvasElement
}
export let drawChart = (data:ChartData) => {
    let option:any = {
        title: {
            text: `中国${data.title}疫情详情`
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: [
            {
                type: 'category',
                // boundaryGap: false,
                data: data.xData
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: `${data.title}`,
                type: 'bar',
                data: data.yData
            }
        ]
    };    
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(data.dom);
    // 绘制图表
    myChart.setOption(option);
}
export let drawMap = (yqData:ChartData) => {
    let newVal = yqData.xData.map((item:string, index:number)=>{
        let newItem = {
            name: item,
            value: yqData.yData[index]
        }
        return newItem
    })
    chinaJson.features.forEach(item => {
        if(item.properties.name.indexOf('省')>-1 || item.properties.name.indexOf('市')>-1) {
            item.properties.name = item.properties.name.substr(0,item.properties.name.length-1);
        }else if(item.properties.name.indexOf('自治区')>-1) {
            if(item.properties.name.indexOf("内蒙古")>-1){
                item.properties.name = "内蒙古"
            }else {
                item.properties.name = item.properties.name.substr(0, 2);
            }
        }else if(item.properties.name.indexOf('特别行政区')>-1){
            item.properties.name = item.properties.name.substr(0, item.properties.name.length-5);
        }
    })
    echarts.registerMap('china', chinaJson);
    const mydata = newVal;
    const optionMap:any = {
        backgroundColor: '#FFFFFF',  
        title: {  
            text: `中国${yqData.title}疫情详情`,  
            subtext: '',  
            x:'center'  
        },  
        tooltip : {  
            trigger: 'item'  
        },  
        
        //左侧小导航图标
        visualMap: {  
            show : true,  
            x: 'left',  
            y: 'center', 
            splitList: [   
                {start: 10000},{start: 1000, end:9999},
                {start: 500, end: 999}, {start: 100, end: 499},
                {start: 10, end: 99}, {start: 1, end: 9},
                {start: 0, end: 0},  
            ],  
            color: ['#7f1102','#bd1318', '#e74b44', '#ff8c71','#fdd39f', '#fff2cf', '#ffffff']  
        },  
        //配置属性
        series: [{
            name: yqData.title,  
            type: 'map',  
            mapType: 'china',   
            roam: false,  
            label: {  
                normal: {  
                    show: true  //省份名称  
                },  
                emphasis: {  
                    show: false  
                }  
            },  
            data:mydata  //数据
        }]  
    };  
    //初始化echarts实例
    const myChart = echarts.init(yqData.dom);
    //使用制定的配置项和数据显示图表
    myChart.setOption(optionMap);
}