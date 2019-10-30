<template>
    <div id="Home">
        <div id="map-container">
            <!--<div class="position-button" @click="locate">-->
            <!--<img v-if="!locateLoading" src="../assets/png/loc_gray.png" alt="">-->
            <!--<img v-else src="../assets/png/loading.gif" alt="">-->
            <!--</div>-->
        </div>

        <!--<div class="custom-marker" style="  background-color: red;-->
        <!--width: 60px;-->
        <!--height: 60px;-->
        <!--position: fixed;-->
        <!--z-index: 1;-->
        <!--top: 100px;-->
        <!--left: 100px;-->
        <!--border-radius: 50%;-->
        <!--border:1px solid black;">-->
        <!--<img class="head" style=" width: 100%;-->
        <!--height: 100%;-->
        <!--border:3px solid white;-->
        <!--border-radius: 50%;-->
        <!--position: relative;-->
        <!--z-index: 1;" src="../assets/png/img.jpg" alt="">-->
        <!--<div class="qz" style="width: 100%;-->
        <!--position: absolute;-->
        <!--top: 40px;-->
        <!--height: 40px;-->
        <!--background-color: red;"></div>-->
        <!--<div class="num" style=" width: 24px;-->
        <!--height: 24px;-->
        <!--border-radius: 50%;-->
        <!--background-color: white;-->
        <!--border: 2px solid black;-->
        <!--position: absolute;-->
        <!--bottom: -3px;-->
        <!--left: -3px;-->
        <!--z-index: 1;-->
        <!--font-size: 12px;-->
        <!--display: flex;-->
        <!--align-items: center;-->
        <!--justify-content: center;">22</div>-->
        <!--<div class="hg" style="  height: 30px;-->
        <!--width: 30px;-->
        <!--position: absolute;-->
        <!--top: -13px;-->
        <!--right: -13px;-->
        <!--z-index: 1;-->
        <!--transform: rotate(45deg);-->
        <!--background-color: red;"></div>-->
        <!--</div>-->
    </div>
</template>

<script>

    import {mapActions, mapGetters} from 'vuex'
    import png1 from '../assets/png/img.jpg'
    import png2 from '../assets/png/img.jpg'
    import png3 from '../assets/png/img.jpg'
    import cr from '../assets/png/cr／4.png'
    import qz from '../assets/png/flag／lv1.png'
    import {getList} from "@/https";

    export default {
        name: "Home",
        data() {
            return {
                locateLoading: false,
                location: {},
                map: null,
                placeSearch: null,
                pointList: [],
                markerList: []
            }
        },
        watch: {
            pointList(list) {
                this.markerList.forEach(item => {
                    //清除marker
                    item && item.setMap(null)
                })
                this.markerList = list.map(item => {
                    let m = this.createMarker(item)
                    m.setMap(this.map)
                    m.on('click', e => {
                        alert('map_id=' + item.map_id)
                    })
                    return m
                })
            }
        },

        async mounted() {
            // var position = new AMap.LngLat(116.209467, 39.917761);
            // var position = new AMap.LngLat();

            let data = {
                "code": 0,
                "info": [
                    {
                        "location": "104.07262,30.661539",
                        "map_id": "B0FFF9VG8F",
                        "poi_name": "鼓楼南街70号院",
                        "top_avatar": "https://loopyun03.loopyun.com/default.jpg",
                        "top_flag": "https://media.loopyun.com/level_1.png",
                        "top_id": 298459,
                        "top_level": 1,
                        "top_name": "中国梦"
                    },
                    {
                        "location": "104.072395,30.661036",
                        "map_id": "B001C7V5HK",
                        "poi_name": "耗子洞老张鸭子(鼓楼总店)",
                        "top_avatar": "https://loopyun03.loopyun.com/default.jpg",
                        "top_flag": "https://media.loopyun.com/level_1.png",
                        "top_id": 298459,
                        "top_level": 1,
                        "top_name": "中国梦"
                    },
                    {
                        "location": "104.072087,30.661316",
                        "map_id": "B0FFGYYCZP",
                        "poi_name": "鼓楼南街57号院",
                        "top_avatar": "https://loopyun03.loopyun.com/default.jpg",
                        "top_flag": "https://media.loopyun.com/level_1.png",
                        "top_id": 298459,
                        "top_level": 1,
                        "top_name": "中国梦"
                    },
                    {
                        "location": "104.072115,30.661499",
                        "map_id": "B0FFF9VJMS",
                        "poi_name": "鼓楼南街59号院",
                        "top_avatar": "https://loopyun03.loopyun.com/default.jpg",
                        "top_flag": "https://media.loopyun.com/level_1.png",
                        "top_id": 298459,
                        "top_level": 1,
                        "top_name": "中国梦"
                    },
                    {
                        "location": "104.073188,30.661796",
                        "map_id": "B0FFG71F35",
                        "poi_name": "三桂前街47号院",
                        "top_avatar": "https://loopyun03.loopyun.com/default.jpg",
                        "top_flag": "https://media.loopyun.com/level_1.png",
                        "top_id": 298459,
                        "top_level": 1,
                        "top_name": "中国梦"
                    },
                    {
                        "location": "104.072661,30.66201",
                        "map_id": "B0FFF9VG8H",
                        "poi_name": "鼓楼南街100号院",
                        "top_avatar": "https://loopyun03.loopyun.com/default.jpg",
                        "top_flag": "https://media.loopyun.com/level_1.png",
                        "top_id": 298459,
                        "top_level": 1,
                        "top_name": "中国梦"
                    },
                    {
                        "location": "104.071897,30.661016",
                        "map_id": "B0FFF9VJMW",
                        "poi_name": "鼓楼南街51号院",
                        "top_avatar": "https://loopyun03.loopyun.com/default.jpg",
                        "top_flag": "https://media.loopyun.com/level_1.png",
                        "top_id": 298459,
                        "top_level": 1,
                        "top_name": "中国梦"
                    },
                    {
                        "location": "104.073222,30.661908",
                        "map_id": "B0FFFFWVOK",
                        "poi_name": "三桂前街61号院",
                        "top_avatar": "https://loopyun03.loopyun.com/default.jpg",
                        "top_flag": "https://media.loopyun.com/level_1.png",
                        "top_id": 298459,
                        "top_level": 1,
                        "top_name": "中国梦"
                    },
                    {
                        "location": "104.072391,30.662055",
                        "map_id": "B001C7WRCV",
                        "poi_name": "周记面馆(鼓楼南街店)",
                        "top_avatar": "https://loopyun03.loopyun.com/default.jpg",
                        "top_flag": "https://media.loopyun.com/level_1.png",
                        "top_id": 298459,
                        "top_level": 1,
                        "top_name": "中国梦"
                    },
                    {
                        "location": "104.073497,30.661843",
                        "map_id": "B001C7UOAZ",
                        "poi_name": "清真皇城坝牛肉馆(三桂前街店)",
                        "top_avatar": "https://loopyun03.loopyun.com/default.jpg",
                        "top_flag": "https://media.loopyun.com/level_1.png",
                        "top_id": 298459,
                        "top_level": 1,
                        "top_name": "中国梦"
                    }
                ],
                "msg": ""
            }

            this.pointList = data.info

            // 创建地图实例
            this.map = new AMap.Map("map-container", {
                viewMode: '3D',
                showBuildingBlock: true,
                expandZoomRange: true,
                zooms: [3, 20],
                pitch: 50,
                zoom: 19.5,
                // center: position,
                resizeEnable: true,
                animateEnable: true,
            });
            let map = this.map
            // map.on('click', (ev) => {
            //     // 触发事件的对象
            //     var target = ev.target;
            //     // 触发事件的地理坐标，AMap.LngLat 类型
            //     var lnglat = ev.lnglat;
            //     // 触发事件的像素坐标，AMap.Pixel 类型
            //     var pixel = ev.pixel;
            //     // 触发事件类型
            //     var type = ev.type;
            //     console.log(lnglat)
            // });
            AMap.plugin('AMap.PlaceSearch', function (e) {
            });
            await this.$nextTick()

            this.placeSearch = new AMap.PlaceSearch({
                // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
                // city: '010',
                // type: '餐饮服务', // 兴趣点类别
                pageSize:50
            })

            AMap.plugin([
                'AMap.ToolBar',
                'AMap.Scale',
                'AMap.OverView',
                'AMap.MapType',
                'AMap.Geolocation',
            ], () => {
                // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
                map.addControl(new AMap.ToolBar());

                // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
                map.addControl(new AMap.Scale());

                // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
                map.addControl(new AMap.OverView({isOpen: true}));

                // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
                map.addControl(new AMap.MapType());

                // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
                const geo = new AMap.Geolocation()
                map.addControl(geo);

                AMap.event.addListener(geo, 'complete', onComplete)
                AMap.event.addListener(geo, 'error', onError)
                geo.getCurrentPosition()

                let _this = this;

                function onComplete(data) {
                    console.log('// 定位成功', data)
                    _this.location = data
                    _this.createPoint(data.position.lng, data.position.lat)
                    // _this.createPoint(104.072395, 30.661036)
                    // console.log(data)
                    // data是具体的定位信息
                }

                function onError(data) {
                    console.log('// 定位出错')
                    // 定位出错
                }
            });
        },
        methods: {
            createPoint(lng, lat) {
                this.placeSearch.searchNearBy('',
                    new AMap.LngLat(lng, lat),
                    500,
                    (status, result) => {
                        this.map.panTo(new AMap.LngLat(lng, lat))
                        console.log('=============', status, result.poiList)
                        const array = result.poiList.pois.map(item => {
                            return item.id
                        })
                        // 拿到头像等数据
                        getList({"poidList": array}).then(res => {
                            if(res.code===0){
                                this.pointList= res.info
                            }
                            console.log(res)
                        })
                        // 查询成功时，result即对应匹配的POI信息
                    });
            },
            locate() {
                this.locateLoading = true
                setTimeout(() => {
                    this.locateLoading = false
                }, 1000)
                if (this.location && this.location.position) {
                    this.map.panTo(this.location.position)
                    this.placeSearch.searchNearBy('',
                        this.location.position,
                        5000,
                        function (status, result) {
                            console.log(status, result.poiList.pois)
                            // 查询成功时，result即对应匹配的POI信息
                        })
                }

                console.log(this.location)
            },
            createMarker(e) {
                let center = e.location.split(',')
                let img = e.top_avatar
                let text = e.top_name
                let level = e.top_level
                let qz = e.top_flag
                // 点标记显示内容，HTML要素字符串
                var markerContent = `<div class="custom-marker"
            style="width: 60px;
            height: 60px;
            box-sizing: border-box;
            position: relative;
            border-radius: 50%;
            border:1px solid black;">
            <img class="head" style=" width: 100%;
                height: 100%;
                border:3px solid white;
                box-sizing: border-box;
                border-radius: 50%;
                position: relative;
                z-index: 1;" src="${img}" alt="">
            <img class="qz"
            src="${qz}"
            style="width: 100%;
                position: absolute;
                top: 55px;
                height: 60px;"/>
            <div class="num" style=" width: 24px;
                height: 24px;
                border-radius: 50%;
                background-color: white;
                border: 2px solid black;
                position: absolute;
                bottom: -3px;
                left: -3px;
                z-index: 1;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;">${level}</div>
            <img class="hg" src="${cr}" style="  height: 30px;
                width: 30px;
                position: absolute;
                top: -13px;
                right: -13px;
                z-index: 1;
                transform: rotate(45deg);"/>
        </div>`

                return new AMap.Marker({
                    position: center,
                    // 将 html 传给 content
                    content: markerContent,
                    offset: new AMap.Pixel(0, 0), // 设置点标记偏移量
                    anchor: 'center', // 设置锚点方位
                })
            },
            ...mapActions([])
        },
        computed: {
            ...mapGetters([])
        }
    }
</script>

<style scoped lang="less">
    #Home {
        width: 100%;
        height: 100%;
        /*position: relative;*/
        * {
            /*box-sizing: border-box;*/
        }

        .position-button {
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 1;
            width: 40px;
            height: 40px;
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 10px 2px #cccccc;
        }

        .custom-marker {
            background-color: red;
            width: 60px;
            height: 60px;
            position: relative;
            /*z-index: 1;*/
            /*top: 100px;*/
            /*left: 100px;*/
            border-radius: 50%;
            border: 1px solid black;
            .head {
                width: 100%;
                height: 100%;
                border: 3px solid white;
                border-radius: 50%;
                position: relative;
                z-index: 1;
            }
            .qz {
                width: 100%;
                position: absolute;
                top: 40px;
                height: 40px;
                background-color: red;
            }
            .num {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background-color: white;
                border: 2px solid black;
                position: absolute;
                bottom: -3px;
                left: -3px;
                z-index: 1;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .hg {
                height: 30px;
                width: 30px;
                position: absolute;
                top: -13px;
                right: -13px;
                z-index: 1;
                transform: rotate(45deg);
                background-color: red;
            }

        }

        #map-container {
            width: 100%;
            height: 100%;
        }

    }
</style>
