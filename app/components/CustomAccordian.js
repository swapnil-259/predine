import { Collapse, CollapseBody, CollapseHeader } from "accordion-collapse-react-native";
import { Separator } from 'native-base';
import { Text, View } from 'react-native';
import { DishCard, StyledText } from ".";

const CustomAccordian = ({ name, menuData }) => {
    console.log('mame', menuData)
    return (
        <View>
            <Collapse isExpanded={true} >
                <CollapseHeader >
                    <Separator style={{ height: 50, backgroundColor: '#fff' }}>
                        <Text style={{ color: '#000', fontSize: 22, fontWeight: 'bold' }}>{name}</Text>
                    </Separator>
                </CollapseHeader>
                <CollapseBody>
                    {!menuData ? <StyledText tw="text-center text-black">
                        Waiting for data...
                    </StyledText> : menuData.map((each, index) => {
                        if (each.category_id__parent === name)
                            return (
                                <DishCard props={{ ...each }} key={index}></DishCard>

                            )
                    })}

                </CollapseBody>
            </Collapse>
        </View>

    )
}
export default CustomAccordian