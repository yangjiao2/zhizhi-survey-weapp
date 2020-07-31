import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Image } from '@tarojs/components'
import classNames from "classnames";
// import './index.scss'

export default class extends Component {
    render() {
        const defaultProps = {
            isBack: false,
            leftIcon: '\ue84c',
            title: ' ',
            background: '#6190e8',
            color: '#fff',
            center: false,
            search: false,
            searchStyle: '',
            fixed: false,
            headerRight: [],
        }

        return (
            <View className={classNames('taro__navbar')} >
                <View className={classNames('taro__navbar-wrap')}>
                    返回
                        <View className={classNames('taro__navbar-left__view')}>
                        {/* {isBack &&
                                <TouchView activeOpacity={.5} onClick={this.handleNavigateBack}>
                                    <View className="taro__navbar-icon__item"><Text className="iconfont taro__navbar-iconfont">{'<<'}</Text></View>
                                </TouchView>
                            } */}
                            dsdsdds
                        </View>


                    {/* 右侧 */}
                    {/* <View className="taro__navbar-right__view">
                            {headerRight.map((item, index) => (
                                <TouchView activeOpacity={.5} key={index} onClick={() => item.onClick && item.onClick(searchText)}>
                                    <View className="taro__navbar-icon__item">
                                        {item.icon && <Text className="iconfont taro__navbar-iconfont" style={{ color: color, ...item.style }}>{item.icon}</Text>}
                                        {item.text && <Text className="taro__navbar-iconfont__text" style={{ color: color, ...item.style }}>{item.text}</Text>}
                                        {item.img && <Image className="taro__navbar-iconfont__img" src={item.img} mode='aspectFit' />}
                                        {/* 圆点 */}
                    {/*    {!!item.badge && <Text className="taro__badge taro__navbar-badge">{item.badge}</Text>}
                        {!!item.dot && <Text className="taro__badge-dot taro__navbar-badge--dot"></Text>}
                    </View>
                                </TouchView>
            ))
        }
                        </View> */}
                </View >
            </View >
        );
    }

}
