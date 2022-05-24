import React, { useRef, useState } from 'react';
import { Tree, Typography } from 'antd';
import axios from 'axios';
const { DirectoryTree } = Tree;
const { Title } = Typography

const treeData = [
  {
    title: 'SFCS',
    key: 'SFCS',

  },
  {
    title: 'OA',
    key: 'OA',

  },
  {
    title: 'TEST',
    key: 'TEST',

  },
  {
    title: 'I4.0',
    key: 'I4.0',

  },
];

const Architecture = () => {
  const Wrapper = useRef(null)
  const [exhibit, setExhibit] = useState(null)
  const onSelect = async (keys, info) => {
    console.log(Wrapper.current);
    try {
      const result = await axios.post(`/api/${info.node.title}`)
      setExhibit(result.data)
    } catch (error) {

    }
  };

  const onExpand =  () => {

  };

  return (
    <div style={{ marginTop: 30 }} ref={Wrapper}>
      <Title level={5}>网络架构</Title>
      <DirectoryTree
      // 支持点选多个节点
        multiple
        // 默认展开所有树节点
        // defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={treeData}
      />
      <div>{exhibit}</div>
    </div>

  );
};

export default Architecture;