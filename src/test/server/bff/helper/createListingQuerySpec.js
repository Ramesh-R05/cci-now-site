import createListingQuery from '../../../../app/server/bff/helper/createListingQuery';

describe('createListingQuery helper function', () => {
    describe('when passed a valid array of tag names', () => {
        ['ne', 'eq'].forEach(operator => {
            describe(`and the operator is ${operator}`, () => {
                let result;
                let tags;

                before(() => {
                    tags = ['food:Dish:type:Cupcake', 'food:Dish:type:Cake'];
                    result = createListingQuery(tags, { operator });
                });

                it('returns the correct formatted query', () => {
                    expect(result).to.eq(`tagsDetails/fullName%20${operator}%20%27food_Dish_type_Cupcake,food_Dish_type_Cake%27`);
                });
            });
        });

        describe('and the operator is invalid', () => {
            let result;
            let tags;
            let operator;

            before(() => {
                tags = ['food:Dish:type:Cupcake', 'food:Dish:type:Cake'];
                operator = 'xe';
                result = createListingQuery(tags, { operator });
            });

            it('returns an empty string', () => {
                expect(result).to.eq('');
            });
        });
    });
    describe('when passed an invalid array of tag names', () => {
        let result;
        let tags;
        let operator;

        before(() => {
            operator = 'ne';
            tags = [];
            result = createListingQuery(tags, { operator });
        });

        it('returns an empty string', () => {
            expect(result).to.eq('');
        });
    });
});
