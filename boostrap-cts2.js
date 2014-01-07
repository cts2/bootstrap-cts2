(function ($) {
    'use strict';

    $.fn.extend({
        annotate: function (options) {

            var defaults = {
                cts2Service: "http://10.148.2.82:8888",
                trigger: 'hover' ,
                uriDataAttr: 'uri',
                href: null
                };

            options = $.extend(defaults, options);

            return this.each(function(idx) {
                var $item = $(this);
                var uri = $item.data(options.uriDataAttr);

                var className = "dynamicContent" + idx.toString();
                var content = '<div class="'+className+'">Loading...</div>';

                $item.popover({
                    trigger: options.trigger,
                    html: true,
                    content: function(){return content}
                });

                var href = options.href ? options.href : options.cts2Service + "/entitybyuri?format=json&uri=" + uri;

                $.ajax({
                    url: href,
                    dataType: 'jsonp',
                    success: function(response){
                        var designation = response.EntityDescriptionMsg.entityDescription.classDescription.designation[0].value;
                        var id = response.EntityDescriptionMsg.entityDescription.classDescription.entityID
                        content = "";
                        content += "<b>Name:</b> " + id.name;
                        content += "<br/><b>Namespace:</b> " + id.namespace;
                        content += "<br/><b>Designation:</b> " + designation;

                        $('.' + className).html(content);
                    }
                });
            });
        }


    });
}(jQuery));

