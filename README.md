# raw ECharts component for streamlit

A Streamlit component for the [ECharts](https://echarts.apache.org/en/index.html) library.

## Features

It has following advantages comparing to [Streamlit-echarts](https://github.com/andfanilo/streamlit-echarts):
- It is written in pure html/js without react/vue/webpack, no need to install nodejs when developping. It can also be used as template to write other html/js based component for traditional frontend-developpers.
- It supports raw ECharts api, i.e, useing "`new echarts.graphic.LinearGradient(...)`" as color in chart option.
- Benifit from ECharts design scheme, chart can be dynamiclly updated without remounted by specifying a key.
- It can returns the `chart.getDataURL()` as component value, so can easily save or download chart as picutre by code.
- It integrates basic ECharts libraries and map resources from [pyecharts-assets](https://github.com/pyecharts/pyecharts-assets), so can be used in off-line environments.

Short conclusion: with this component, streamlit user can display any ECharts by setting params on the python side, no development on the frontend is necessary anymore.

## Install

1. `pip install streamlit-raw-echarts`
2. basic charts and 3D charts already be available with a fresh installation. If additional geo map needed, user can:
    - download [pyecharts-assets](https://github.com/pyecharts/pyecharts-assets) zipball, then copy pyecharts-assets/assets/maps folder to {streamlit_raw_echarts installation folder}/frontend/. This repo contains maps of lots countries.
    - pass custome geo json data to component your self.

## Usage examples
```python
import streamlit as st
from streamlit_raw_echarts import st_echarts,JsCode,CustomMap
import random


with st.echo('below'):
    option={
        'backgroundColor':'#fff',
        'title':{
            'text':'example chart',
            'subtext':'using pyecharts-assets',
        },
        'tooltip':{
            'trigger':'item',
        },
        'visualMap':{
            'seriesIndex':1,
        },
        'grid':{'bottom':'55%'},
        'xAxis':{
            'data':[1,2,3,4,5],
        },
        'yAxis':{},
        'series':[
            {
                'type':'bar',
                'name':'KPI',
                'data':[1,2,3,4,5],
                'label':{
                    'show':True,
                    'position':'top',
                },
                'visualMap':False,
                'color':JsCode('new echarts.graphic.LinearGradient(0,0,0,1,[{"offset":0,"color":"red"},{"offset":1,"color":"yellow"}])')             
            },
            {
                'name':'users',
                'type':'map',
                'mapType':'world',
                'top':'55%',
                'label':{'show':False},
                'roam':True,
                'data':[
                    {
                        'name':'China',
                        'value':150,
                        'label':{
                            'show':True,
                            'formatter':JsCode('function(p){return p.data.name+":"+p.value;}')
                            }
                    },
                    {
                        'name':'United States',
                        'value':200,
                        'label':{
                            'show':True,
                            'formatter':JsCode('function(p){return p.data.name+":"+p.value;}')
                            }
                    },
                    {'name':'Brazil','value':100},
                ]
            }
        ]
    }

    st.title('example:')

    for i in range(3):
        option['series'][1]['data'][i]['value']=random.randint(1,200)
    for i in range(5):
        option['series'][0]['data'][i]=random.randint(1,10)

    chart=st_echarts(option=option,
                    theme='shine',
                    height=600,
                    events={
                        'click':'function(param){alert("your click:"+param.data.name);}'
                        },
                    returnData={},
                    key='echarts1',
                    )
    st.button('refresh',help='update chart dynamiclly')
    if chart:
        st.write('the component returns as :')
        st.write(chart[:25]+' ... '+chart[-25:])
        st.markdown('<a href="{}" download="{}">download chart as picture</a>'.format(chart,'echarts1.png'),unsafe_allow_html=True)
```

## API
The APIs are similar with [Streamlit-echarts](https://github.com/andfanilo/streamlit-echarts).

Additional parameters:
- notMerge/lazyUpdate: passed to chart.setOption, whether merge the option or not.
- returnData: dict with values same to chart.getDataURL(), will set chart's image data as component value. Be careful this will slows down your app.

## Further development
User can add any params to `frontend/index.html.updateChart`, then pass params through st_echarts.

## Credit
Thanks to [andfanilo](https://github.com/andfanilo), I take some ideas from his [Streamlit-echarts](https://github.com/andfanilo/streamlit-echarts).

Thanks to [pyecharts team](https://github.com/pyecharts), they provide lots of assets especially usefull for Chinese users.