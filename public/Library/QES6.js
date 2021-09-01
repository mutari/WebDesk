`strict`

/**
 * @typedef DOCObject
 */

/**
 * return a doc object
 * @param args{string, HTMLElement}
 * @return {DOCObject}
 */
function doc(...args) {

    if(typeof args[0] == "function") {
        document.addEventListener("DOMContentLoaded", () => {
            args[0]();
        });
    } else if(typeof args[0] != "string") {
        args = [...args[0]]
    }

    function getData(str, type) {
        if(str) {
            doc(args).do(element => {
                if(type == 'text')
                    element.innerText = str;
                else if(type == 'html')
                    element.innerHTML = str;
            })
        } else { // if no args is passed to the function
            let outString = [];
            doc(args).do(element => {
                if(type == 'text')
                    outString.push(element.innerText);
                else if(type == 'html')
                    outString.push(element.innerHTML);
            })
            if(outString.length == 1)
                return outString[0];
            else
                return outString;
        }
        return doc(args);
    }


    //region dom manipulation

    let domManipulation = {

        /**
         * get data set of name
         * @param name{string} name of the dataset
         * @return {[string]|string} return dataset value
         */
        dataset: (name) => {
            doc(args).do(element => {
                datasetValues = [];
                datasetValues.push(element.dataset[name])
            })
            if(attributes.length == 1)
                return datasetValues[0];
            else
                return datasetValues;
        },

        /**
         * create a HTMLElement
         * @param tagName{string} tag name
         * @return {DOCObject}
         */
        create: (tagName) => {
             let newElement = document.createElement(tagName);
             let elements = [];
             doc(args).do(element => {
                 let elementClone = newElement.cloneNode(true);
                 element.append(elementClone);
                 elements.push(elementClone);
             });
             return doc(elements);
        },

        /**
         * set id of DOCObject
         * @param str{string}
         * @return {DOCObject}
         */
        id: (str) => {
            if(str)
                return doc(args).attribute('id', str);
            else
                return doc(args).attribute('id');
        },

        /**
         * if name and value is set then attribute is set
         * if only name is set the it returns attribute
         * if no param is set the return array of all attributes on DOCObject element
         * @param name{string} name of attribute
         * @param value{string} value of attribute
         * @return {DOCObject|[string]|string}
         */
        attribute: (name, value) => {
            if(name && value) {
                doc(args).do(element => {
                    element.setAttribute(name, value);
                });
            } else if(name) {
                let outString = [];
                doc(args).do(element => {
                    outString.push(element.getAttribute(name));
                })
                if(outString.length == 1)
                    return outString[0];
                else
                    return outString;
            } else {
                let outList = [];
                doc(args).do(element => {
                    attributes = [];
                    for (var att, i = 0, atts = element.attributes, n = atts.length; i < n; i++) {
                        attributes.push({
                            'name' : atts[i].nodeName,
                            'value' : atts[i].nodeValue
                        })
                    }
                    if(attributes.length == 1)
                        outList.push(attributes[0]);
                    else
                        outList.push(attributes);
                })
                if(outList.length == 1)
                    return outList[0];
                else
                    return outList;
            }
            return doc(args);
        },

        /**
         * if param is set then set innerTEXT of DOCObject to str
         * else get innerTEXT from DOCObject
         * @param str{string} set text
         * @return {string|[string]|DOCObject}
         */
        text: (str) => {
            return getData(str, 'text');
        },

        /**
         * if param is set then set innerHTML of DOCObject to str
         * else get innerHTML from DOCObject
         * @param str{string} set html
         * @return {string|[string]|DOCObject}
         */
        html: (str) => {
            return getData(str, 'html');
        },

        /**
         * if param is set then set value of DOCObject to str
         * else get value from DOCObject
         * @param str{string} to set value to
         * @return {[string]|string|DOCObject}
         */
        value: (str) => {
            if(str !== undefined) {
                doc(args).do(element => {
                    element.value = str
                })
            } else {
                values = [];
                doc(args).do(element => {
                    values.push(element.value)
                })
                if(values.length == 1)
                    return values[0];
                else
                    return values;
            }

        }

    }


    //endregion

    //region event handeles

    function event(event, __callback) {
        doc(args).do(element => {
            element.addEventListener(event, __callback);
        })
    }

    let eventHandler = {

        /**
         * adds a on click event
         * @param __callback{function} calls when a click occures
         * @return {DOCObject}
         */
        click: (__callback) => {
            if(__callback)
                return event('click', __callback);
            else
                doc(args).do(element => {
                    element.click();
                });
            return doc(args);
        },

        /**
         * add a event
         * @param event{string} type of event
         * @param __callback{function} get called when event occures
         * @return {DOCObject}
         */
        event: (event, __callback) => {
            return event(event, __callback)
        }

    }


    //endregion


    //region advanced querys

    let querys = {

        /**
         * do something to every element in array
         * @param __callbacks{function}
         */
        do: (__callbacks) => {
            if(typeof args[0] == 'string') { // loop and query strings
                args.forEach(elementStr => {
                    document.querySelectorAll(elementStr).forEach(element => {
                        __callbacks(element);
                    });
                });
            } else { // loop elements
                args.forEach(element => {
                    __callbacks(element);
                });
            }
        }

    }

    //endregion




    //region css classes
    /**
     * css classes
     * add, remove, switch
     */

    let cssClass = {

        /**
         * set class
         * @param argsClass[]{string}
         * @return {DOCObject}
         */
        addClass: (...argsClass) => {
            argsClass.forEach(value => {
                doc(args).do(element => {
                    element.classList.add(value)
                })
            });
            return doc(args);
        },

        /**
         * remove class
         * @param argsClass[] {string}
         * @return {DOCObject}
         */
        removeClass: (...argsClass) => {
            argsClass.forEach(value => {
                doc(args).do(element => {
                    element.classList.remove(value)
                })
            });
            return doc(args);
        },

        /**
         * switch one class for another
         * @param orginClass{string}
         * @param toClass{string}
         * @return {DOCObject}
         */
        switchClass: (orginClass, toClass) => {
            doc(args).do(element => {
                element.classList.remove(orginClass);
                element.classList.add(toClass);
            })
            return doc(args);
        }
    }

    //endregion

    return {
        ...cssClass,
        ...querys,
        ...domManipulation,
        ...eventHandler
    };
}