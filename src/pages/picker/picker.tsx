import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'


export default class PagePicker extends Component {
    state = {
        selector: ['美国', '中国', '巴西', '日本'],
        selectorChecked: '美国',
        timeSel: '12:01',
        dateSel: '2018-04-22'
    }
    onChange = e => {
        this.setState({
            selectorChecked: this.state.selector[e.detail.value]
        })
    }

    render() {
        return (
            <View className='container'>
                <View className='page-body'>
                    <View className='page-section'>
                        <Text>地区选择器</Text>
                        <View>
                            <Picker mode='multiSelector' range={[this.state.selector]} onChange={this.onChange}>
                                <AtList>
                                    <AtListItem
                                        title='国家地区'
                                        extraText={this.state.selectorChecked}
                                    />
                                </AtList>
                            </Picker>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}