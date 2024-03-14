import Button from "../components/button";

@Route("index.html")
export default class Index {
  render() {
    return <div>
      你好，decor-framework
      <Button type={'primary'}>btn</Button>
    </div>
  }
}