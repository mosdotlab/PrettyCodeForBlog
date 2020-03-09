import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const code = `
// comment
/*comment block*/
const
func()
'quotes' val 'quotes'
val 'quotes' val'
1`;

const expectedResult = `
<pre class="pretty-code-dark">
<p><span class="comment">// comment</span></p>
<p><span class="comment">/&#42;comment block&#42;/</span></p>
<p><span class="keyword">const</span></p>
<p><span class="function">func</span>&#40;&#41;</p>
<p><span class="quotes">'quotes'</span> val <span class="quotes">'quotes'</span></p>
<p>val <span class="quotes">'quotes' val'</span></p>
<p><span class="number">1</span></p><br />
</pre>
`;

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatFormFieldModule,
        MatTabsModule,
        MatSnackBarModule],
      declarations: [
        AppComponent
      ],
      providers: [

      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'PrettyCodeForBlog'`, () => {
    expect(component.title).toEqual('PrettyCodeForBlog');
  });

  it('should call ngOnInit', () => {
    expect(component.ngOnInit).toBeTruthy();
  });

  it('should get prettify result', () => {
    component.code = code;
    fixture.detectChanges();
    expect(component.result).toEqual(expectedResult);
  });

  it('should call getMinIndex', () => {
    const str = ' val\n  val\n val';
    expect(component.getMinIndex(str)).toEqual(1);
  });
});
