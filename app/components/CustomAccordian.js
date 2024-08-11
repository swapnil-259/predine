import { Collapse, CollapseBody, CollapseHeader } from "accordion-collapse-react-native";
import { Separator } from 'native-base';
import { Text, View } from 'react-native';
import { DishCard, StyledText } from ".";

const CustomAccordian = ({ name, menuData }) => {
    const categoryDishes = menuData.filter(each => each.category_id__parent === name);

    return (
        <View>
            <Collapse isExpanded={true} >
                <CollapseHeader >
                    <Separator style={{ height: 50, backgroundColor: '#fff' }}>
                        <Text style={{ color: '#000', fontSize: 22, fontWeight: 'bold' }}>{name}</Text>
                    </Separator>
                </CollapseHeader>
                <CollapseBody>
                    {categoryDishes.length === 0 ? (
                        <StyledText tw="text-center text-black">
                            No dishes available for this category
                        </StyledText>
                    ) : (
                        categoryDishes.map((each, index) => (
                            <DishCard props={{ ...each }} key={index}></DishCard>
                        ))
                    )}
                </CollapseBody>
            </Collapse>
        </View>
    );
};

export default CustomAccordian;
