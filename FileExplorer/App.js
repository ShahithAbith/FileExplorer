import "./styles.css";
import explorer from "./data/folderData.js";
import { Folder } from "./components/Folder";
import { useState } from "react";
import useTraverseTree from "./components/hooks/use-traverse-tree";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode } = useTraverseTree();

  const handleNewTree = (folderId, item, isFolder) => {
    insertNode(explorerData, folderId, item, isFolder);
  };

  return (
    <div className="App">
      <Folder handleNewTree={handleNewTree} explorerData={explorerData} />
    </div>
  );
}
