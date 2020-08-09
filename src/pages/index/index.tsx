import React, { Component, useState, useCallback } from 'react'
import { View, Text, Image, Button, Textarea, Picker, PickerView, PickerViewColumn, Slider } from '@tarojs/components'
import { AtProgress, AtButton, AtNavBar, AtTextarea, AtList, AtListItem, AtMessage, AtToast } from 'taro-ui'
import Taro from '@tarojs/taro'
import classNames from 'classnames'

import "taro-ui/dist/style/components/index.scss" // 按需引入
import MultipleChoice from './MultipleChoice'
// import NavBar from './../navbar/navbar'
import { getWindowHeight } from './../../utils/style'
import headerImg from './../../asset/header.png'; // header.png';
import leftArrow from './../../asset/leftArrow.png'
import rightArrow from './../../asset/rightArrow.png'

import './index.less'
import question_data from './../../data/question.json'


const QuestionType = {
  'single': '单选题',
  'multi': '多选题',
  'multifree': '多选题',
  'picker': '单选题',
  'slider': '单选题',
};
const greenColor = '#27b67a';

export default function Index() {
  const [step, setStep] = useState(0);
  const total = question_data.length - 1;
  const [selected, setSelected] = useState([]);
  const [freetext, setFreeText] = useState("");

  const badge = (text) => {
    return (
      <View className='home-screen__badge'>
        <Text>{text}</Text>
      </View >
    );
  }

  const onSelect = (value) => {
    console.log(selected, value)
    setSelected(selected1 => {
      return [...selected1, value];
    });
  }
  const onDeselect = (value) => {
    setSelected(selected1 => {
      const prevSelected = selected1;
      const newSelected = prevSelected.filter((item, index) => {
        console.log(index, value);
        return index == value
      });
      return newSelected;
    });
  }

  const contentRenderer = //useCallback(
    (inputs) => {
      console.log(inputs, selected);
      const inputLength = inputs.length;

      if (step == 0) {
        return (
          <View>
            <View className='component__content'>
              <Button className={classNames({ 'component__column-btn': true, 'component__btn-selected': selected[0] == 0 })}
                onClick={(_e) => { setSelected([0]) }}>{inputs[0].text}</Button>
              <Button className={classNames({ 'component__column-btn': true, 'component__btn-selected': selected[0] == 1 })}
                onClick={(_e) => { setSelected([1]) }}>{inputs[1].text}</Button>
            </View>
          </View>
        )
      }
      if (type == "multi" || type == "multifree") {
        if (inputLength < 5) {
          return (
            <View className='component__button-list'>
              {inputs.map((answer, index) => {
                const { text, isSelected } = answer;
                return (
                  <AtButton key={index}
                    className={classNames({ 'component__list-btn component__btn': true, 'component__btn-selected': isSelected })}
                    size="normal"
                    onClick={(value) => isSelected ? onDeselect(index) : onSelect(index)}>
                    <AtListItem
                      title={text}
                      note={text}
                      hasBorder={false}
                    />
                  </AtButton>);
              })}
              {type == "multifree" && (
                <AtTextarea value={freetext}
                  onChange={(value) => {
                    console.log(value);
                    setFreeText(value);
                  }}
                  placeholder='请输入'
                >
                </AtTextarea>

              )}
            </View>
          );
        }
        return (
          <View className='component__row-content'>
            {inputs.map((answer, index) => {
              const { text, isSelected } = answer;
              return (
                <AtButton key={index} className={classNames({ 'component__btn': true, 'component__btn-selected': isSelected })}
                  size="small"
                  onClick={(value) => isSelected ? onDeselect(index) : onSelect(index)}>
                  {text}
                </AtButton>);
            })}
            {type == "multifree" && (
              <AtTextarea value={freetext} onChange={(value) => {
                setFreeText(value);
              }} placeholder='请输入'></AtTextarea>

            )}
          </View>
        )
      }
      if (type == "picker") {
        const column2 = inputs[inputLength - 1].text.split(',');
        const column1 = inputs[selected.length == column2.length ? selected[column2.length - 1] : 0].text.split(',');
        return (
          <View className='component__row-content'>
            <View
              style='width: 10%;'>
              <Image
                className={'component__picker-icon '}
                // style='width: 24px; height: 24px; paddingTop: 100px'
                src={rightArrow}></Image>
            </View>
            {/* <View> */}
            <PickerView
              indicatorStyle='height: 50px;'
              style='width: 80%; height: 300px;'
              value={selected == [] ? [0, 0] : selected}
              onChange={(e) => {
                setSelected(e.detail.value)
              }}
            >
              <PickerViewColumn key={1}
              >
                {column1.map((item, index) => {
                  return (
                    <View key={index}>{item}</View>
                  )
                })}
              </PickerViewColumn>
              <PickerViewColumn key={2}
                style={{ textAlign: 'right' }}>
                {column2.map((item, index) => {
                  return (
                    <View key={index}>{item}</View>
                  )
                })}
              </PickerViewColumn>
            </PickerView>
            {/* </View> */}
            <View
              style='width: 10%; height: 100%;'>
              <Image
                className={'component__picker-icon-right'}
                src={leftArrow}
              ></Image>
            </View>
          </View>
        );
      }
      if (type == "slider") {
        console.log(inputs[1].text, inputs[0].text);
        return (
          <View className='component__row-content'>
            <Slider
              style={{ width: '100%' }}
              blockColor={greenColor}
              activeColor={'#676767'}
              step={inputs[1].text - inputs[0].text}
              value={selected == [] ? 0 : selected[0]}
              min={inputs[0].text}
              max={inputs[inputLength - 1].text}
              onChange={(e) => {
                setSelected([e.detail.value])
              }}
            />
            <View className={'component__slider-content'}
            >
              {inputs.map((answer, index) => {
                return (
                  <View key={index} className={'slider__unit'}>
                    {answer.text}
                  </View>
                )
              })}
            </View>
          </View>
        );
      }
      return (
        <View>

          {/* {
            (type == "单选题" && answers.length == 2 && answers[0] instanceof Object) &&
            <Picker mode='multiSelector' range={answers[0].values} onChange={(value) => { }} value={['', '']}>
              <AtList>
                <AtListItem
                  customStyle={{ color: 'white' }}
                  title='国家地区'
                  extraText={'1100'}
                />
              </AtList>
            </Picker>
          } */}

        </View >
      );
    }


  const { answers, type, title } = question_data[step];
  const inputs =
    (answers as Array<any>).map((answer, index) => {
      return { 'text': answer, 'isSelected': selected.includes(index) };
    });
  return (
    <View>
      <View className='home-screen__background'>
        <Image className='home-screen__headerimg' src={headerImg}></Image>
      </View>
      <View className='home-screen__content'>
        <View>
          {badge(QuestionType[type])}
          < View className='home-screen__title' >
            <Text>{title}</Text>
          </View >
          {contentRenderer(inputs)}

        </View >
      </View>
      <View className='home-screen__footer'>
        <Text className='home-screen__previous' onTouchStart={() => {
          setStep(step => step - 1)
          setSelected([])
        }} onClick={() => {
          setStep(step => step - 1)
          setSelected([])
        }}>上一题</Text>
        <Text className='home-screen__process'>{step + 1} / {total}</Text>
        <AtProgress percent={Math.round(step / total * 100)} color={greenColor} isHidePercent />
        <AtButton className={'home-screen__next-btn'}
          type='primary' circle={true}
          onClick={() => {
            setStep(step => step + 1)
            setSelected([])
          }
          }>
          下一题
              </AtButton>
      </View>
    </View >
  )
}
