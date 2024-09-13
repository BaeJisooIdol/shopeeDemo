function  Validation (opptions) {

    var isRules = {};

    function Validate (inputElement, rule) {
        var errorMassage;
        var massageElemant = inputElement.parentElement.querySelector('#element-massage');

        var newrules = isRules[rule.selection];

        for (var newrule of newrules) {
            errorMassage = newrule(inputElement.value)

            if (errorMassage) break;
        }

        if (errorMassage) {
            massageElemant.innerText = errorMassage;
        } else {
            massageElemant.innerText = '';
        }


    };

    var formElement = document.querySelector(opptions.form_2);

    if (formElement) {

            opptions.rules.forEach(function (rule) {

                if (Array.isArray(isRules[rule.selection])) {
                    isRules[rule.selection].push(rule.test )
                } else {
                    isRules[rule.selection] = [rule.test] 
                }
        

                var inputElement = formElement.querySelector(rule.selection);
                if (inputElement) {
                    inputElement.onblur = function () {
                        Validate(inputElement, rule)
                    }

                    inputElement.onclick = function () {
                        var errorMassage = rule.test(inputElement.value);
                        var massageElemant = inputElement.parentElement.querySelector('#element-massage');
                        if (errorMassage) {
                            massageElemant.innerText = '';
                        }
                    }
                };
            })

        };
    
}


isRequire = function (selection) {
    return {
        selection: selection,
        test: function (value) {
            return value ? undefined : 'Vui lòng nhập trường này'
        }
    }
}


isEmail$sđt = function (selection) {
    return {
        selection: selection,
        test: function (value) {
            var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(value) ? undefined : 'Trường này phải là email'
        }
    }
}

isPassword = function (selection, min) {
    return {
        selection: selection,
        test: function (value) {
            return value.length >= min ? undefined : 'Mật khẩu tối thiểu phải 6 kí tự'
        }
    }
}



