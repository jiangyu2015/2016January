/**
 * jiangyukun on 2015/12/30.
 */
define('EditCarInfoView', ['zepto', 'underscore', 'backbone'], function ($, _, Backbone) {
    return Backbone.View.extend({
        className: 'carbaby_page page slideIn',
        template: _.template($('#editInfoTemplate').html()),
        events: {
            'tap .my-btn-cancel': 'back',
            'tap .my-btn-confirm': 'save',
            'change #uploadImage': 'uploadImage',
            'change #carBirthdayInput': 'carBirthdayInput',
            'change #sexSelect': 'sexSelect',
            'change #skinColorSelect': 'skinColorSelect'
        },
        initialize: function () {
            this.$el.html(this.template());
            this.$carImgOfEdit = this.$el.find('#carImgOfEdit');

            this.$carNameOfEdit = this.$el.find('#carNameOfEdit');

            this.$carBirthdayInput = this.$el.find('#carBirthdayInput');
            this.$carBirthdayOfEdit = this.$el.find('#carBirthdayOfEdit');

            this.$carAgeOfEdit = this.$el.find('#carAgeOfEdit');

            this.$sexSelect = this.$el.find('#sexSelect');
            this.$sexText = this.$el.find('#sexText');

            this.$skinColorSelect = this.$el.find('#skinColorSelect');
            this.$skinColorText = this.$el.find('#skinColorText');

            this.$carDescriptionOfEdit = this.$el.find('#carDescriptionOfEdit');
            this.render();

            this.$carBirthdayInput.mobiscroll().date({
                theme: 'ios',
                mode: 'scroller',
                display: 'modal',
                lang: 'zh',
                dateFormat: 'yy-mm-dd'
            });

            this.listenTo(this.model, 'sync', this.render);
        },
        render: function () {
            this.refreshHeadImg(this.model.get('headImgUrl'));
            this.$carNameOfEdit.val(this.model.get('nickName'));
            this.$carBirthdayOfEdit.text(this.model.get('birthday'));
            this.$carAgeOfEdit.text(this.model.get('age'));
            var sexValue = this.model.get('sex');
            this.$sexSelect.val(sexValue);
            this.$sexText.text(this.getSexText(sexValue));
            this.$skinColorSelect.val(this.model.get('color'));
            this.$skinColorText.text(this.model.get('color'));
            this.$carDescriptionOfEdit.val(this.model.get('description'));
            return this;
        },
        refreshHeadImg: function (src) {
            this.$carImgOfEdit.children().remove();
            var $img = $('<img>').attr('src', src);
            this.$carImgOfEdit.append($img[0]);
        },
        uploadImage: function (event) {
            var self = this;
            var file = event.target.files[0];
            if (!file) return;

            lrz(file, function (result) {
                self.doUpload(result);
            });
        },
        doUpload: function (result) {
            var self = this;
            $.ajax({
                type: 'POST',
                url: '../../carbaby/uploadHeader.do',
                data: {
                    header: result.base64
                },
                success: function (result) {
                    self.refreshHeadImg('../../' + result);
                }
            });
        },
        carBirthdayInput: function () {
            this.$carBirthdayOfEdit.text(this.$carBirthdayInput.val());
        },
        sexSelect: function () {
            this.$sexText.text(this.getSexText(this.$sexSelect.val()));
        },
        skinColorSelect: function () {
            var skinColorValue = this.$skinColorSelect.val();
            this.$skinColorText.text(skinColorValue || '请选择');
        },
        back: function () {
            history.back();
        },
        save: function () {
            this.model.set('nickName', this.$carNameOfEdit.val());
            this.model.set('birthday', this.$carBirthdayOfEdit.text());
            this.model.set('sex', this.$sexSelect.val());
            this.model.set('color', this.$skinColorText.text());
            this.model.set('xingge', this.$carDescriptionOfEdit.val());
            if (this.model.isValid()) {
                $.ajax({
                    url: '../../carbaby/editCarInfo.do',
                    method: 'put',
                    data: {
                        nickName: this.model.get('nickName'),
                        birthday: this.model.get('birthday'),
                        sex: this.model.get('sex'),
                        color: this.model.get('color'),
                        xingge: this.model.get('xingge'),
                        vinCode: this.model.get('vinCode')
                    },
                    success: function () {
                        history.back();
                    }
                });
                /*this.model.save(null, {
                 url: '../../carbaby/editCarInfo.do',
                 data: {
                 nickName: this.model.get('nickName'),
                 birthday: this.model.get('birthday'),
                 sex: this.model.get('sex'),
                 color: this.model.get('color'),
                 xingge: this.model.get('xingge'),
                 vinCode: this.model.get('vinCode')
                 },
                 success: function () {
                 history.back();
                 }
                 });*/
            }
        },
        getSexText: function (value) {
            if (value == '') {
                return '请选择';
            } else if (value == '1') {
                return '王子';
            } else {
                return '公主';
            }
        },
        destroy: function (callback) {
            var self = this;
            this.isRemoved = false;
            this.$el.addClass('slideOut').on('animationend', function () {
                if (self.isRemoved) return;
                self.doDestroy(callback);
            }).on('webkitAnimationEnd', function () {
                if (self.isRemoved) return;
                self.doDestroy(callback);
            });
        },
        doDestroy: function (callback) {
            this.isRemoved = true;
            this.remove();
            this.stopListening();
            if (typeof callback == 'function') {
                callback();
            }
        }
    });
});
