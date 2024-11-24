import React, { useState } from 'react';
import { Sise } from '../../models/Sise.model';
import SiseList2 from '../SiseList2';

interface IcompareData {
    leftData: Sise[];
    rightData: Sise[];
}
const CompareSise = () => {
    const [comparedData, setComparedData] = useState<IcompareData>({
        leftData: [],
        rightData: [],
    });
    const [isSiseListOpened, setIsSiseListOpened] = useState<boolean>(false);

    const handleCompareData = (data: Sise[]) => {
        if (data.length === 2) {
            setComparedData({
                leftData: [data[0]],
                rightData: [data[1]],
            });
            setIsSiseListOpened(false);
        }
    };

    return (
        <div>
            <button onClick={() => setIsSiseListOpened(!isSiseListOpened)}>
                시세 목록 열기
            </button>

            {isSiseListOpened && (
                <SiseList2
                    isCompareMode={true}
                    onCompareComplete={handleCompareData}
                />
            )}

            {comparedData.leftData.length > 0 &&
                comparedData.rightData.length > 0 && (
                    <div>
                        <h3>비교 데이터</h3>
                        <div>
                            <p>{`왼쪽: ${comparedData.leftData[0].mhouseNm}`}</p>
                            <p>{`오른쪽: ${comparedData.rightData[0].mhouseNm}`}</p>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default CompareSise;
