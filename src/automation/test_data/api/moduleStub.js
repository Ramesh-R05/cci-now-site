import sinon from 'sinon';
import hamburgernavigation from '../modules/hamburgerNavigation';
import mustRead from '../modules/mustRead';
import promoted from '../modules/promoted';
import hometheme from '../modules/hometheme';
import headernavigation from '../modules/headernavigation';
import subsectionList from '../modules/subsectionList';
import awwhero from '../modules/awwhero';

const getModulesStub = sinon.stub();

getModulesStub.resolves({});

getModulesStub.withArgs('headernavigation', 'hamburgernavigation', 'footer', 'mustread', 'promoted', 'hero', `homehero`, `hometheme`).resolves({
    headernavigation,
    hamburgernavigation,
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
        hamburgernavigation,
        footer: {},
        mustread: mustRead,
        promoted,
        hero: {}
    });

getModulesStub
    .withArgs('headernavigation', 'hamburgernavigation', 'footer', 'mustread', 'promoted', 'hero', 'awwtheme', sinon.match.string)
    .resolves({
        headernavigation,
        hamburgernavigation,
        footer: {},
        mustread: mustRead,
        promoted,
        hero: awwhero
    });

const getModuleStub = sinon.stub();
getModuleStub.withArgs(sinon.match(value => value.startsWith('sections/'))).resolves(subsectionList);

export { getModulesStub, getModuleStub };
