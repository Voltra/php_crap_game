/**
 * @param {string} selector - the selector from which retrieve styles
 * @author Ludwig GUERIN
 */

export function getStyles(selector){
    const stylesheets = Array.prototype.slice.call(document.styleSheets);
    return stylesheets.reduce((acc, stylesheet)=>{
        const rules = Array.prototype.slice.call(stylesheet.cssRules)
        .filter(rule => rule.type === CSSRule.STYLE_RULE)
        .filter(rule => rule.selectorText.includes(selector));

        return Object.assign(acc, rules.reduce((rulesAcc, rule)=>{
            const styles = Array.prototype.slice.call(rule.style);
            return Object.assign(rulesAcc, styles.reduce((stylesAcc, style)=>{
                return Object.assign(stylesAcc, {
                    [style]: rule.style.getPropertyValue(style)
                });
            }, {}));
        }, {}));
    }, {});
}