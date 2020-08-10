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
import question_health from './../../data/question_health.json'
import question_male from './../../data/question_male.json'
import question_female from './../../data/question_female.json'
import question_diet from './../../data/question_diet.json'
import question_med from './../../data/question_med.json'

import ContentRenderer from './content'
import storage from './../../utils/database'

storage();

const QuestionType = {
  'single': '单选题',
  'multi': '多选题',
  'multifree': '多选题',
  'picker': '单选题',
  'picker-left': '单选题',
  'slider': '单选题',
  'text': '问答',
};

const greenColor = '#27b67a';
const questions = [...question_data, ...question_diet, ...question_med]
export default function Index() {
  const [step, setStep] = useState(2);
  const total = questions.length - 1;
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

  const setSelectedCb = useCallback((value) => {
    setSelected(value);
  }, [selected]);

  const setFreeTextCb = useCallback((value) => {
    setSelected(value);
  }, [freetext]);

  const { answers, type, title } = questions[step];
  console.log(answers);
  const extra: any[] = questions[step]["extra"] ?? [];
  console.log(extra);

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
          {<ContentRenderer
            questions={questions}
            step={step}
            selected={selected}
            freetext={freetext}
            setSelectedCb={setSelectedCb}
            setFreeTextCb={setFreeTextCb}
          >
          </ContentRenderer>}
        </View >
      </View>
      <View className='home-screen__footer'>
        {step >= 1 && (<Text className='home-screen__previous' onTouchStart={() => {
          setStep(step => step - 1)
          setSelected([])
        }} onClick={() => {
          setStep(step => step - 1)
          setSelected([])
        }}>上一题</Text>)}
        <Text className='home-screen__process'>{step + 1} / {total + 1}</Text>
        <AtProgress percent={Math.round(step / total * 100)} color={greenColor} isHidePercent />
        {step < questions.length - 1 ? (<AtButton className={'home-screen__next-btn'}
          type='primary' circle={true}
          onClick={() => {
            console.log(questions[step], questions[step]["extra"]);
            if (extra) {
              if (extra.length == 1 && selected.includes(extra[0])) {
                setStep(step => step + 1)
              } else {
                let counter = 0;
                while (questions[counter++]["extra"] != undefined) {
                  counter++;
                }
                setStep(step => step + counter)
              }
            }
            setSelected([])
            setFreeText("")
          }
          }>
          下一题
        </AtButton>) : (
            <AtButton className={'home-screen__next-btn'}
              type='primary' circle={true}
              onClick={() => {
                // console.log(questions[step], questions[step]["extra"]);
                // if (extra) {
                //   if (extra.length == 1 && selected.includes(extra[0])) {
                //     setStep(step => step + 1)
                //   } else {
                //     let counter = 0;
                //     while (questions[counter++]["extra"] != undefined) {
                //       counter++;
                //     }
                //     setStep(step => step + counter)
                //   }
                // }
                setSelected([])
                setFreeText("")
              }
              }>
              完成
            </AtButton>
          )}
      </View>
    </View >
  )
}
