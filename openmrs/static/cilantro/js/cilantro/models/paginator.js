var __slice=[].slice,__hasProp={}.hasOwnProperty,__extends=function(t,e){function n(){this.constructor=t}for(var r in e)__hasProp.call(e,r)&&(t[r]=e[r]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};define(["../core","underscore","backbone"],function(t,e,n){var r,u,i;return i={comparator:"page_num",refresh:function(){return this.pending?void 0:(this.pending=!0,this.fetch({reset:!0}).done(function(t){return function(){return delete t.pending,t.setCurrentPage(t.models[0].id)}}(this)))},parse:function(t,e){return e.reset||this.reset(null,{silent:!0}),this.perPage=t.per_page,this.trigger("change:pagesize",this,this.perPage),this.numPages=t.num_pages,this.trigger("change:pagecount",this,this.numPages),this.objectCount=t.object_count,this.trigger("change:objectcount",this,this.objectCount),this.currentPageNum=null,this.setCurrentPage(t.page_num),[t]},hasPage:function(t){return t>=1&&t<=this.numPages},hasNextPage:function(t){return null==t&&(t=this.currentPageNum),t<this.numPages},hasPreviousPage:function(t){return null==t&&(t=this.currentPageNum),t>1},setCurrentPage:function(t){if(t!==this.currentPageNum){if(!this.hasPage(t))throw new Error("Cannot set the current page out of bounds");return this.previousPageNum=this.currentPageNum,this.currentPageNum=t,this.trigger.apply(this,["change:currentpage",this].concat(__slice.call(this.getCurrentPageStats())))}},getPage:function(t,e){var n;return null==e&&(e={}),this.hasPage(t)?((n=this.get(t))||e.load===!1||(n=new this.model({page_num:t}),n.pending=!0,this.add(n),n.fetch().done(function(){return function(){return delete n.pending}}(this))),n&&e.active!==!1&&this.setCurrentPage(t),n):void 0},getCurrentPage:function(t){return this.getPage(this.currentPageNum,t)},getFirstPage:function(t){return this.getPage(1,t)},getLastPage:function(t){return this.getPage(this.numPages,t)},getNextPage:function(t,e){return null==t&&(t=this.currentPageNum),this.getPage(t+1,e)},getPreviousPage:function(t,e){return null==t&&(t=this.currentPageNum),this.getPage(t-1,e)},pageIsLoading:function(t){var e;return null==t&&(t=this.currentPageNum),(e=this.getPage(t,{active:!1,load:!1}))?!!e.pending:void 0},getPageCount:function(){return this.numPages},getCurrentPageStats:function(){return[this.currentPageNum,{previous:this.previousPageNum,first:1===this.currentPageNum,last:this.currentPageNum===this.numPages}]}},r=function(n){function r(){return r.__super__.constructor.apply(this,arguments)}return __extends(r,n),r.prototype.idAttribute="page_num",r.prototype.url=function(){var n;return n=e.result(this.collection,"url"),t.utils.alterUrlParams(n,{page:this.id,per_page:this.collection.perPage})},r}(n.Model),u=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return __extends(e,t),e.prototype.model=r,e}(n.Collection),e.extend(u.prototype,i),{PaginatorMixin:i,Page:r,Paginator:u}});
//# sourceMappingURL=paginator.js.map