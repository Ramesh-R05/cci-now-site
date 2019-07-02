import sinon from 'sinon';
import { newHamburgerNav } from '../modules/hamburgerNavigation';
import mustRead from '../modules/mustRead';
import promoted from '../modules/promoted';
import hometheme from '../modules/hometheme';
import headernavigation from '../modules/headernavigation';
import subsectionList from '../modules/subsectionList';

const getModulesStub = sinon.stub();

getModulesStub.withArgs('headernavigation', 'hamburgernavigation', 'footer', 'mustread', 'promoted', 'hero', `homehero`, `hometheme`).resolves({
    headernavigation,
    hamburgernavigation: newHamburgerNav,
    footer: {},
    mustread: mustRead,
    promoted,
    hero: {},
    homehero: {},
    theme: hometheme
});
getModulesStub
    .withArgs('headernavigation', 'hamburgernavigation', 'footer', 'mustread', 'promoted', 'hero', sinon.match.string, sinon.match.string)
    .resolves({
        headernavigation,
        hamburgernavigation: newHamburgerNav,
        footer: {},
        mustread: mustRead,
        promoted,
        hero: {}
    });

const getModuleStub = sinon.stub();
getModuleStub.withArgs(sinon.match(value => value.startsWith('sections/'))).resolves(subsectionList);

export { getModulesStub, getModuleStub };
