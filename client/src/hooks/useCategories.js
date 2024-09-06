import { useState, useEffect } from 'react';
import Axios from 'axios';

// カテゴリーリストの管理と更新を行うカスタムフック
const useCategories = () => {
    // カテゴリーリストを状態として管理
    const [categoryList, setCategoryList] = useState([]);

    // カテゴリーリストをAPIから取得し、状態を更新する関数
    const refreshCategories = () => {
        Axios.get("http://localhost:3001/api/get/users").then((response) => {
            setCategoryList(response.data); // 取得したデータでカテゴリーリストを更新
        });
    };

    // コンポーネントがマウントされたときにカテゴリーリストを取得する
    useEffect(() => {
        refreshCategories();
    }, []); // []は依存配列。空の場合、最初のマウント時にのみ実行される。

    // カテゴリーリストとリフレッシュ関数を返す
    return { categoryList, refreshCategories };
}

export default useCategories; // このカスタムフックを他のコンポーネントで使用できるようにエクスポート
