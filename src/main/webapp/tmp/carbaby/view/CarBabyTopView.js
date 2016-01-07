/**
 * jiangyukun on 2015/12/30.
 */
define('CarBabyTopView', ['backbone', 'zepto'], function (Backbone, $) {
    return Backbone.View.extend({
        el: '.profile',
        events: {
            'tap .head_img': 'editProfile',
            'tap .base_info': 'editProfile',
            'tap .designation': 'changeDesignation'
        },
        initialize: function () {
            this.$baseInfo = this.$el.find('.base_info');
            this.$headImg = this.$el.find('.head_img');
            this.$carNickname = this.$el.find('#carNickname');
            this.$carSex = this.$el.find('#carSex');
            this.$carAge = this.$el.find('#carAge');
            this.$carDescription = this.$el.find('#carDescription');
            this.$carTitle = this.$el.find('#carTitle');

            this.listenTo(this.model, 'sync', this.render);
        },
        render: function () {
            var $carOwnerHeadImg = $('<img>').attr('src', this.model.get('headImgUrl'));
            this.$headImg.append($carOwnerHeadImg[0]);

            this.$carNickname.text(this.model.get('nickName'));
            this.$carSex.text(this.model.get('sex'));
            this.$carAge.text(this.model.get('age'));
            this.$carDescription.text(this.model.get('description'));
            this.$baseInfo.show();
            var titles = this.model.get('titles');
            if (titles && titles.length != 0) {
                this.$carTitle.text(titles[0]);
                this.currentTitleIndex = 0;
            } else {
                this.$carTitle.text('暂无称号');
                this.currentTitleIndex = -1;
            }
            return this;
        },
        editProfile: function () {
            var pageUrl = location.href;
            if (pageUrl.indexOf('carBabyShared') != -1) {
                return;
            }
            this.trigger('toPage');
        },
        changeDesignation: function () {
            if (this.currentTitleIndex == -1) return;
            var titles = this.model.get('titles');
            var titleCount = titles.length;
            if (this.currentTitleIndex + 1 != titleCount) {
                this.currentTitleIndex++;
            } else {
                this.currentTitleIndex = 0;
            }
            this.$carTitle.text(titles[this.currentTitleIndex]);
        }
    });
});
