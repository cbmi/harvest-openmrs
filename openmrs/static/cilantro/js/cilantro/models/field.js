define(["underscore","backbone","../core","./base","./stats"],function(t,e,i,s,n){var r=function(t){var e=i.config.get("fields.instances."+t.id+".type");return e?e:t.type?t.type:(e=t.simple_type,t.enumerable||"boolean"===e?"choice":e)},o=s.Model.extend({constructor:function(){s.Model.prototype.constructor.apply(this,arguments);var t=this;this.links.stats&&(this.stats=new n.StatCollection,this.stats.url=function(){return t.links.stats})},parse:function(){this._cache={};var t=s.Model.prototype.parse.apply(this,arguments);return t.type=r(t),t},distribution:function(t,i){if(i!==!1&&(i=!0),void 0===this.links.distribution)return void t();if(i&&void 0!==this._cache.distribution)t(this._cache.distribution);else{var s=this;e.ajax({url:this.links.distribution,dataType:"json",success:function(e){return i&&(s._cache.distribution=e),t(e)}})}},values:function(t,i,s){if(s!==!1&&(s=!0),"function"==typeof t?(i=t,s=i,t={}):t&&(s=!1,"string"==typeof t&&(t={query:t})),!this.links.values)return void i();var n=e.$.Deferred();if(i&&n.done(i),s&&void 0!==this._cache.values)n.resolve(this._cache.values);else{var r=this;e.ajax({url:this.links.values,data:t,dataType:"json",success:function(t){s&&(r._cache.values=t),n.resolve(t)},error:function(){n.reject()}})}return n.promise()}}),a=s.Collection.extend({model:o,search:function(i,s){e.ajax({url:t.result(this,"url"),data:{query:i},dataType:"json",success:function(t){s(t)}})}});return{FieldModel:o,FieldCollection:a}});
//# sourceMappingURL=field.js.map