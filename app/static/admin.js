String.prototype.format = function () {
    var args = arguments;
    this.unkeyed_index = 0;
    return this.replace(/\{(\w*)\}/g, function (match, key) {
        if (key === '') {
            key = this.unkeyed_index;
            this.unkeyed_index++
        }
        if (key == +key) {
            return args[key] !== 'undefined'
                ? args[key]
                : match;
        } else {
            for (var i = 0; i < args.length; i++) {
                if (typeof args[i] === 'object' && typeof args[i][key] !== 'undefined') {
                    return args[i][key];
                }
            }
            return match;
        }
    }.bind(this));
};


function mdform(h) {
    var form = `
    <form>
    <textarea>
    {}
    </textarea>
    </form>
    `.format("hej mor");
    return form;
}

$(document).ready(function () {
    $(".mdedit").hide();
    $(".new-form-d").hide();
    $(".book-edit").hide();
    $(".gist-form").hide();

    $('.inputtag').tagEditor({
        clickDelete: true,
        placeholder: 'Enter tags ...',
        forceLowercase: false,
    });

    $('input[type=date]').combodate({
        minYear: 2000,
        maxYear: 2050,
        format: "DD-MM-YYYY",
        template: "D-MMM-YYYY",
        value: moment().format("DD-MM-YYYY")
    });

    $(".admin-prop").click(function () {
        var cls = ".c" + $(this).attr("id");
        var editelement = $(cls).find(".mdedit").show();
        $(cls).find(".md").hide();
        //   var eltext = $(editelement).html();
        //   $(editelement).html(mdform(eltext));

    });

    $("form.mdedit").submit(function (event) {
        event.preventDefault();
        var data = $(this).serializeArray();
        $(this).parent().hide();
        $(this).parent().next().html(data[1]["value"]);
        $(this).parent().next().show();
    });

    $("#new-post, #edit-post").click(function () {
        $("#post").show();
        $(this).hide();
    });

    $("#edit-project, #new-project").click(function () {
        $("#project").show();
        $(this).hide();
    });

    $("#new-book").click(function () {
        $("#book").show();
        $(this).hide();
    });

    $(".edit-gist").click(function () {
        var p = $(this).parents("li");
        p.find(".gist-form").show();
        p.find("ul.tags").children("li").each(function (i) {
            p.find(".gist-form").find('.inputtag').tagEditor('addTag', $(this).text(), true);
        });
        p.find("ul.tags").hide();
        $(this).hide();
    });

    $(".edit-book").click(function () {
        $(this).parent().parent().find(".book-edit").show();
        $(this).hide();
    });

    $("#edit-post").click(function () {
        $('#post-tags').children("li").each(function (i) {
            console.log($(this).text())
            $('.inputtag').tagEditor('addTag', $(this).text(), true);
        });

        $("#title").text($(".content-title").text());
        $("#body").text($(".post-text").text());

    });

    $("form.new-post").submit(function (event) {
        event.preventDefault();
        var data = $(this).serializeArray();
        console.log(data)
        $("#new-post").show();
        $("#post").hide();
    });

    $("#edit-project").click(function () {
        var p = $("#project");
        $('#project-tags').children("li").each(function (i) {
            console.log($(this).text())

            $(p).find('.inputtag').tagEditor('addTag', $(this).text(), true);
        });

        $(p).find("#title").text($(".content-title").text());
        $(p).find("#body").text($(".project-descr").text());

    });

    $("form.book-edit").submit(function (event) {
        event.preventDefault();
        var data = $(this).serializeArray();
        $(this).hide();
        $(this).prev().find(".edit-book").show();
    });

    $("form.gist-form").submit(function (event) {
        event.preventDefault();
        var data = $(this).serializeArray();
        var p = $(this).parents("li");
        $(this).hide();
        p.find(".edit-gist").show();
        p.find("ul.tags").show();
    });

});