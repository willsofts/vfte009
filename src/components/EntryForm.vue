<template>
  <DialogForm ref="dialogForm">
    <template v-slot:header>
      <h4 class="modal-title" v-if="insertMode">{{ labels.title_new }}</h4>
      <h4 class="modal-title" v-if="updateMode">{{ labels.title_edit }}</h4>
    </template>
    <template v-slot:default>
        <div class="row row-height">
          <div class="col-height col-md-7">
            <label for="domainname">{{ labels.domainname_label }}</label>
            <div class="input-group has-validation" :class="{'has-error': v$.domainname.$error}">
              <input ref="domainname" type="text" v-model="localData.domainname" id="domainname" class="form-control input-md" maxlength="50" />
              <label class="required">*</label>
            </div>
            <span v-if="v$.domainname.$error" class="has-error">{{ v$.domainname.$errors[0].$message }}</span>
          </div>
        </div>
        <div class="row row-height">
          <div class="col-height col-md-10">
            <label for="description">{{ labels.description_label }}</label>
            <div class="input-group has-validation" :class="{'has-error': v$.description.$error}">
              <input ref="description" type="text" v-model="localData.description" id="description" class="form-control input-md" maxlength="100" />
              <label class="required">*</label>
            </div>
            <span v-if="v$.description.$error" class="has-error">{{ v$.description.$errors[0].$message }}</span>
          </div>
        </div>
        <div class="row row-height">
          <div class="col-height col-md-10">
            <label for="applicationid">{{ labels.applicationid_label }}</label>
            <div class="input-group has-validation" :class="{'has-error': v$.applicationid.$error}">
              <input ref="applicationid" type="text" v-model="localData.applicationid" id="applicationid" class="form-control input-md" maxlength="50" />
              <label class="required">*</label>
            </div>
            <span v-if="v$.applicationid.$error" class="has-error">{{ v$.applicationid.$errors[0].$message }}</span>
          </div>
        </div>
        <div class="row row-height">
          <div class="col-height col-md-10">
            <label for="tenanturl">{{ labels.tenanturl_label }}</label>
            <div class="input-group has-validation" :class="{'has-error': v$.tenanturl.$error}">
              <input ref="tenanturl" type="text" v-model="localData.tenanturl" id="tenanturl" class="form-control input-md" maxlength="200" />
              <label class="required">*</label>
            </div>
            <span v-if="v$.tenanturl.$error" class="has-error">{{ v$.tenanturl.$errors[0].$message }}</span>
          </div>
        </div>
        <div class="row row-height">
          <div class="col-height col-md-10">
            <label for="secretkey">{{ labels.secretkey_label }}</label>
            <div class="input-group has-validation" :class="{'has-error': v$.secretkey.$error}">
              <input ref="secretkey" type="text" v-model="localData.secretkey" id="secretkey" class="form-control input-md" maxlength="50" />
              <label class="required">*</label>
            </div>
            <span v-if="v$.secretkey.$error" class="has-error">{{ v$.secretkey.$errors[0].$message }}</span>
          </div>
        </div>
        <div class="row row-height">
          <div class="col-height col-md-5">
            <label>{{ labels.systemtype_label }}</label>
            <select ref="systemtype" v-model="localData.systemtype" class="form-control input-md">
              <option v-for="item in dataCategory.tksystemtype" :key="item.id" :value="item.id">{{item.text}}</option>
            </select>
          </div>
          <div class="col-height col-md-5">
            <label>{{ labels.inactive_label }}</label>
            <select ref="inactive" v-model="localData.inactive" class="form-control input-md">
              <option v-for="item in dataCategory.tkactive" :key="item.id" :value="item.id">{{item.text}}</option>
            </select>
          </div>
        </div>
        <div class="row row-height">
          <div class="col-height col-md-5">
            <label>{{ labels.appstype_label }}</label>
            <select ref="appstype" v-model="localData.appstype" class="form-control input-md">
              <option v-for="item in dataCategory.tkdomainappstype" :key="item.id" :value="item.id">{{item.text}}</option>
            </select>
          </div>
          <div class="col-height col-md-5">
            <label>{{ labels.invisible_label }}</label>
            <select ref="invisible" v-model="localData.invisible" class="form-control input-md">
              <option v-for="item in dataCategory.tkvisible" :key="item.id" :value="item.id">{{item.text}}</option>
            </select>
          </div>
        </div>
        <div class="row row-height">
          <div class="col-height col-md-5">
            <label>{{ labels.domaintype_label }}</label>
            <select ref="domaintype" v-model="localData.domaintype" class="form-control input-md">
              <option v-for="item in dataCategory.tkdomaintype" :key="item.id" :value="item.id">{{item.text}}</option>
            </select>
          </div>
        </div>
        <div class="row row-height">
          <div class="col-height col-md-10">
            <label for="basedn">{{ labels.basedn_label }}</label>
            <div class="input-group has-validation" :class="{'has-error': v$.basedn.$error}">
              <input ref="basedn" type="text" v-model="localData.basedn" id="basedn" class="form-control input-md" maxlength="200" />
              <label class="required" v-if="!isSAML">*</label>
            </div>
            <span v-if="v$.basedn.$error" class="has-error">{{ v$.basedn.$errors[0].$message }}</span>
          </div>
        </div>
        <div class="row row-height">
          <div class="col-height col-md-10">
            <label for="domainurl">{{ labels.domainurl_label }}</label>
            <input ref="domainurl" type="text" v-model="localData.domainurl" id="domainurl" class="form-control input-md" maxlength="200" />
          </div>
        </div>
    </template>
    <template v-slot:footer>
      <button ref="savebutton" id="savebutton" class="btn btn-dark btn-sm" @click="saveClick" v-if="insertMode"><em class="fa fa-save fa-btn-icon"></em>{{ labels.save_button }}</button>
      <button ref="updatebutton" id="updatebutton" class="btn btn-dark btn-sm" @click="updateClick" v-if="updateMode"><em class="fa fa-save fa-btn-icon"></em>{{ labels.update_button }}</button>
      <button class="btn btn-dark btn-sm" data-dismiss="modal"><em class="fa fa-close fa-btn-icon"></em>{{ labels.cancel_button }}</button>
    </template>
  </DialogForm>
</template>
<script>
import { ref, computed, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import $ from "jquery";
import { DEFAULT_CONTENT_TYPE, getApiUrl, disableControls }  from '@willsofts/will-app';
import { startWaiting, stopWaiting, submitFailure, detectErrorResponse }  from '@willsofts/will-app';
import { confirmUpdate, confirmSave, confirmDelete, successbox, serializeParameters } from '@willsofts/will-app';
import DialogForm from './DialogForm.vue';

const APP_URL = "/api/sfte009";
const defaultData = {
  domainid: "",
  domainname: "",
  description: "",
  applicationid: "",
  tenanturl: "",
  secretkey: "",
  systemtype: "W",
  inactive: "0",
  appstype: "W",
  invisible: "0",
  domaintype: "S",
  basedn: "",
  domainurl: "",
};

export default {
  components: {
    DialogForm
  },
  props: {
    modes: Object,
    labels: Object,
    dataCategory: Object
  },
  emits: ["data-saved","data-updated","data-deleted"],
  setup(props) {
    const mode = ref({action: "new", ...props.modes});
    const localData = ref({ ...defaultData }); 
    const disabledKeyField = ref(false);
    const reqalert = ref(props.labels.empty_alert);
    const requiredMessage = () => { return helpers.withMessage(reqalert, required); };
    const requiredField = () => { return localData.value.domaintype == "S" ? false : helpers.withMessage(reqalert, required); };
    const validateRules = computed(() => { 
      return {
        domainname: { required: requiredMessage() },
        description: { required: requiredMessage() },
        applicationid: { required: requiredMessage() },
        tenanturl: { required: requiredMessage() },
        secretkey: { required: requiredMessage() },
        basedn: { required: requiredField() },
      } 
    });
    const v$ = useVuelidate(validateRules, localData, { $lazy: true, $autoDirty: true });
    return { mode, v$, localData, disabledKeyField, reqalert };
  },
  created() {
    watch(this.$props, (newProps) => {      
      this.reqalert = newProps.labels.empty_alert;
    });
  },
  computed: {
    insertMode() {
      return this.mode.action=="insert" || this.mode.action=="new";
    },
    updateMode() {
      return this.mode.action=="update" || this.mode.action=="edit";
    },
    isSAML() {
      return this.localData.domaintype == "S";
    },    
  },
  mounted() {
    this.$nextTick(function () {
      $("#modaldialog_layer").find(".modal-dialog").draggable();
    });
  },
  methods: {
    reset(newData,newMode) {
      if(newData) this.localData = {...newData};
      if(newMode) this.mode = {...newMode};
    },
    submit() {      
      this.$emit('update:formData', this.localData);
    },
    async saveClick() {
      console.log("click: save");
      disableControls($("#savebutton"));
      let valid = await this.validateForm();
      if(!valid) return;
      this.startSaveRecord();
    },
    async updateClick() {
      console.log("click: update");
      disableControls($("#updatebutton"));
      let valid = await this.validateForm();
      if(!valid) return;
      this.startUpdateRecord();
    },
    async validateForm(focusing=true) {
      const valid = await this.v$.$validate();
      console.log("validate form: valid",valid);
      console.log("error:",this.v$.$errors);
      if(!valid) {
        if(focusing) {
          this.focusFirstError();
        }
        return false;
      }
      return true;
    },
    focusFirstError() {
      if(this.v$.$errors && this.v$.$errors.length > 0) {
        let input = this.v$.$errors[0].$property;
        let el = this.$refs[input];
        if(el) el.focus(); //if using ref
        else $("#"+input).trigger("focus"); //if using id
      }
    },
    showDialog() {
      //$("#modaldialog_layer").modal("show");
      $(this.$refs.dialogForm.$el).modal("show");
    },  
    hideDialog() {
      //$("#modaldialog_layer").modal("hide");
      $(this.$refs.dialogForm.$el).modal("hide");
    },
    resetRecord() {
      //reset to default data 
      this.reset(defaultData,{action:"insert"});
      //reset validator
      this.v$.$reset();
      //enable key field
      this.disabledKeyField = false;
    },
    startInsertRecord() {
      this.resetRecord();
      this.showDialog();
    },
    startSaveRecord() {
      confirmSave(() => {
        this.saveRecord(this.localData);
      });
    },
    startUpdateRecord() {
      confirmUpdate(() => { 
        this.updateRecord(this.localData);
      });
    },
    startDeleteRecord(dataKeys) {
      confirmDelete(Object.values(dataKeys),() => {
        this.deleteRecord(dataKeys);
      });
    },
    saveRecord(dataRecord) {
        let jsondata = {ajax: true};
        let formdata = serializeParameters(jsondata,dataRecord);
        startWaiting();
        $.ajax({
          url: getApiUrl()+APP_URL+"/insert",
          data: formdata.jsondata,
          headers : formdata.headers,
          type: "POST",
          dataType: "json",
          contentType: DEFAULT_CONTENT_TYPE,
          error : function(transport,status,errorThrown) {
            console.error("error: status",status,"errorThrown",errorThrown);
            submitFailure(transport,status,errorThrown);
          },
          success: (data) => {
            stopWaiting();
            console.log("success",data);
            if(detectErrorResponse(data)) return;
            successbox(() => {
              //reset data for new record insert
              this.resetRecord();
              setTimeout(() => { this.$refs.domainname.focus(); },100);
              this.$emit('data-saved',dataRecord,data);
            });
          }
      });
    },
    updateRecord(dataRecord) {
        let jsondata = {ajax: true};
        let formdata = serializeParameters(jsondata,dataRecord);
        startWaiting();
        $.ajax({
          url: getApiUrl()+APP_URL+"/update",
          data: formdata.jsondata,
          headers : formdata.headers,
          type: "POST",
          dataType: "json",
          contentType: DEFAULT_CONTENT_TYPE,
          error : function(transport,status,errorThrown) {
            console.error("error: status",status,"errorThrown",errorThrown);
            submitFailure(transport,status,errorThrown);
          },
          success: (data) => {
            stopWaiting();
            console.log("success",data);
            if(detectErrorResponse(data)) return;
            successbox(() => {
              this.hideDialog();
              this.$emit('data-updated',dataRecord,data);
            });
          }
      });
    },
    retrieveRecord(dataKeys) {
      let jsondata = {ajax: true};
      let formdata = serializeParameters(jsondata,dataKeys);
      startWaiting();
      $.ajax({
        url: getApiUrl()+APP_URL+"/retrieve",
        data: formdata.jsondata,
        headers : formdata.headers,
        type: "POST",
        dataType: "json",
        contentType: DEFAULT_CONTENT_TYPE,
        error : function(transport,status,errorThrown) {
          console.error("retrieveRecord: error: status",status,"errorThrown",errorThrown);
          submitFailure(transport,status,errorThrown);
        },
        success: (data) => {
          stopWaiting();
          console.log("retrieveRecord: success",data);
          if(data.body.dataset) {
            this.reset(data.body.dataset,{action:"edit"});
            this.v$.$reset();
            this.disabledKeyField = true;
            this.showDialog();
          }
        }
      });	
    },
    deleteRecord(dataKeys) {
      let jsondata = {ajax: true};
      let formdata = serializeParameters(jsondata,dataKeys);
      startWaiting();
      $.ajax({
        url: getApiUrl()+APP_URL+"/remove",
        data: formdata.jsondata,
        headers : formdata.headers,
        type: "POST",
        dataType: "json",
        contentType: DEFAULT_CONTENT_TYPE,
        error : function(transport,status,errorThrown) {
          console.error("deleteRecord: error: status",status,"errorThrown",errorThrown);
          submitFailure(transport,status,errorThrown);
        },
        success: (data) => {
          stopWaiting();
          console.log("deleteRecord: success",data);
          if(detectErrorResponse(data)) return;
          successbox(() => {
            this.$emit('data-deleted',dataKeys,data);
          });
        }
      });	
    },
  }
};
</script>
