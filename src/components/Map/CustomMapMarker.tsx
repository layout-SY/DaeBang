import styled from 'styled-components';
import { SiseOfBuildingWithXy } from '../../models/Sise.model';
import { formatPrice } from '../../utils/format';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { setDetail, setDetailOpen } from '../../store/slice/DetailSlice';

interface CustomMapMarkerProps {
    sise: SiseOfBuildingWithXy;
}

const CustomMapMarker = ({ sise }: CustomMapMarkerProps) => {
    const { detailOpen } = useTypedSelector((state) => state.detail);
    const dispatch = useTypedDispatch();
    // TODO : 현재는 첫번째 계약 정보를 보여주고 있으나, 추후에 평균계약 정보를 조여주면 좋을 것 같음.
    // 이는 전세 월세  필터가 생긴다음 구현하는게 좋을 것 같음.

    // TODO : 말풀선으 꼬리로 좌표를 가리키기 위해 마커의 위치를 조정하고 있는데 완벽하지 않음..

    //TODO : 마커 클릭시 상세 정보를 보여주어야 함.
    const contractType = sise.contracts[0].monthlyRent ? '월세' : '전세';

    const openDetail = (house: SiseOfBuildingWithXy) => {
        dispatch(setDetailOpen(true));
        dispatch(setDetail(house));
    };
    return (
        <StyledCustomMapMarker
            onClick={() => {
                openDetail(sise);
            }}
        >
            <div className="container">
                <div className="marker">
                    <span>{contractType}</span>
                    {contractType === '전세' && (
                        <span>{formatPrice(sise.contracts[0].deposit)}</span>
                    )}
                    {contractType === '월세' && (
                        <span>
                            {formatPrice(sise.contracts[0].deposit)}/
                            {formatPrice(sise.contracts[0].monthlyRent)}
                        </span>
                    )}
                </div>
                <div className="pop-up">
                    <div>
                        {sise.umdNum} {sise.jibun} {sise.mhouseNm}
                    </div>
                    <div></div>
                    {sise.contracts
                        .filter((contract) => contract.monthlyRent)
                        .map((contract, index) => (
                            <div key={index}>
                                {contract.contractType}{' '}
                                {formatPrice(contract.deposit)}/
                                {formatPrice(contract.monthlyRent)} {'전용'}
                                {contract.excluUseAr}
                                {`m²`}
                            </div>
                        ))}
                    {sise.contracts
                        .filter((contract) => !contract.monthlyRent)
                        .map((contract, index) => (
                            <div key={index}>
                                {contract.contractType}{' '}
                                {formatPrice(contract.deposit)} {'전용'}
                                {contract.excluUseAr}
                                {`m²`}
                            </div>
                        ))}
                </div>
            </div>
        </StyledCustomMapMarker>
    );
};

const StyledCustomMapMarker = styled.div`
    .container {
        position: relative;
        width: fit-content;
        cursor: pointer;
        transform: translate(30%, -60%);

        .marker {
            background: rgba(59, 130, 246, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 3px;
            font-size: 14px;
            position: relative;
            white-space: nowrap;
            box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
            transition:
                opacity 0.2s,
                visibility 0.2s;

            &::after {
                content: '';
                position: absolute;
                bottom: -8px;
                left: 10px;
                width: 0;
                height: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-top: 8px solid rgba(59, 130, 246, 0.9);
            }
        }

        .pop-up {
            position: absolute;
            bottom: 0px;
            left: 50%;
            transform: translateX(-30%);
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            padding: 12px 16px;
            min-width: 200px;
            opacity: 0;
            visibility: hidden;
            transition:
                opacity 0.2s,
                visibility 0.2s;
            z-index: 9999;

            &::after {
                content: '';
                position: absolute;
                bottom: -8px;
                width: 0;
                height: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-top: 8px solid white;
            }
        }

        &:hover {
            .marker {
                opacity: 0;
                visibility: hidden;
            }

            .pop-up {
                opacity: 1;
                visibility: visible;
            }
        }
    }
`;

export default CustomMapMarker;
