import Taro from "@tarojs/taro";
import AV from "leancloud-storage/dist/av-weapp.js";
// import adapters from "leancloud-storage/dist/node/");

const DB_Name: string = "survey_answer";
AV.init({
  appId: "KjRFknFcd1HgSbPzON5ERwky-gzGzoHsz",
  appKey: "vfJPbhN11XgTD1zXJcNNGXEX",
  serverURLs: "https://kjrfknfc.lc-cn-n1-shared.com"
});

export default function Database() {
  console.log("database");
  const TestObject = AV.Object.extend("survey_answer");
  const testObject = new TestObject();
  console.log(testObject);
  console.log(testObject.get("objectId", "5f2ecb0509f8190008d78e6a"));
  testObject.set("q1", [2]);
  console.log(2);
  //   testObject
  //     .save()
  //     .then(testObject => {
  //       console.log("保存成功。");
  //     })
  //     .catch(err => console.log(err));

  new AV.Query(DB_Name)
    .find()
    .then(data => {
      console.log(data);
    })
    .catch(console.error);
}
