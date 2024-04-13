import { Component, OnInit, Input } from '@angular/core';
import { ModalConfig } from 'src/app/models/interfaces';
import { ModalService } from '../../services/modal.service';
import { Account } from 'src/app/store/user-account/user-account.reducers';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectUserId } from 'src/app/store/user/user.selectors';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-acct-card',
  templateUrl: './acct-card.component.html',
  styleUrls: ['./acct-card.component.scss'],
})
export class AcctCardComponent implements OnInit {
  @Input() isBudgetCard = false;
  @Input() account: Account;
  @Input() index: number;

  editAcctModalConfig: ModalConfig = {
    title: 'Edit Account',
    contentList: [],
    fieldsets: [
      {
        name: 'Account Info',
        inputs: [
          {
            formControlName: 'acctName',
            label: 'Account Name',
            type: 'text',
            hidden: false,
            validators: [Validators.required]
          },
          {
            formControlName: 'acctType',
            label: 'Account Type',
            type: 'select',
            hidden: false,
            validators: [Validators.required]
          },
          {
            formControlName: 'acctName',
            label: 'Account Balance',
            type: 'text',
            hidden: false,
            validators: [Validators.required]
          },
        ],
      },
    ],
    modalButtons: [
      {
        buttonText: 'Cancel',
        type: 'neutral',
        dataTest: 'modal-cancel-btn',
        clickFn: () => {
          this.modalService.closeModal();
        },
      },
      {
        buttonText: 'Save',
        type: 'primary',
        dataTest: 'modal-save-btn',
        clickFn: () => console.log('Saving'),
      },
    ],
  };

  constructor(private modalService: ModalService, private store: Store, private afs: AngularFirestore) {}

  ngOnInit(): void {}

  onDeleteAcct(account: Account) {
    this.store.select(selectUserId).subscribe(id => {
      this.afs.collection('users').doc(id).collection('accounts').doc(account.id).delete();
    })
  }

  onEditAcct(account) {
    console.log(account);
    
    // this.modalService.updateModal(this.editAcctModalConfig);
  }
}
